import { DatabaseService } from '@/lib/databaseService'; // Ajusta la ruta según tu estructura
import { configService } from './configService'; // O de donde obtengas el groupId actual

// ========================================================
// INSTANCIA DE DatabaseService PARA PATIENTS
// ========================================================
const groupId = configService ? configService.getGroupId() : 1;
// Tercer parámetro en 'true' porque la tabla 'patients' sí tiene la columna 'group_id' (o 'groupId' según tu esquema)
const patientDatabaseService = new DatabaseService('patients', groupId, true);

// ========================================================
// PATIENT SERVICES
// ========================================================

/**
 * Obtener todos los pacientes activos del grupo actual.
 * @returns {Promise<Array>}
 */
export async function getPatients() {
    return patientDatabaseService.getAll('id', true);
}

/**
 * Obtener un paciente por su ID.
 * @param {number} id - ID del paciente
 * @returns {Promise<Object|null>}
 */
export async function getPatientById(id) {
    return patientDatabaseService.getByField('id', id);
}

/**
 * Obtener un paciente por número de carnet de identidad.
 * @param {string} identityCard - Carnet de identidad
 * @returns {Promise<Object|null>}
 */
export async function getPatientByIdentityCard(identityCard) {
    return patientDatabaseService.getByField('identity_card', identityCard);
}

/**
 * Crear un nuevo paciente.
 * @param {Object} patientData - Datos del paciente (sin id, created_at, updated_at)
 * @returns {Promise<Object>}
 */
export async function createPatient(patientData) {
    return patientDatabaseService.create(patientData);
}

/**
 * Actualizar los datos de un paciente.
 * @param {number} id - ID del paciente
 * @param {Object} updates - Campos a modificar
 * @returns {Promise<Object|null>}
 */
export async function updatePatient(id, updates) {
    console.log('Actualizando paciente:', JSON.stringify(updates));
    return patientDatabaseService.update('id', id, updates);
}

/**
 * Eliminar lógicamente un paciente (cambia state a false).
 * @param {number} id - ID del paciente
 * @returns {Promise<boolean>}
 */
export async function deletePatient(id) {
    const result = await patientDatabaseService.update('id', id, { state: false });
    return result !== null;
}



// import { supabase } from '@/config/supabaseClient';

// class UserService {
//     constructor() {
//         this.storageKey = 'app_patients_list';
//     }

//     /**
//      * Mapea del formato PascalCase de la UI a snake_case de Postgres.
//      */
//     mapToDatabase(patient) {
//         return {
//             id: patient.id || patient.Id || crypto.randomUUID(),
//             rol_id: patient.RolId || 2,
//             name: patient.Name || '',
//             first_surname: patient.FirstSurname || '',
//             second_surname: patient.SecondSurname || '',
//             image: patient.Image || '',
//             age: parseInt(patient.Age, 10) || 0,
//             sexo: patient.Sexo || 'Masculino',
//             birth_date: patient.BirthDate || null,
//             place_of_birth: patient.PlaceOfBirth || '',
//             occupation: patient.Occupation || '',
//             marital_status: patient.MaritalStatus || 'S/N',
//             address: patient.Address || '',
//             identity_card: patient.IdentityCard || '',
//             email: patient.Email || '',
//             phone: patient.Phone || '',
//             personal_questions: patient.personalQuestions || null,
//             pathological_questions: patient.pathologicalQuestions || null,
//             women_questions: patient.womenQuestions || null
//         };
//     }

//     /**
//      * Convierte de snake_case de Postgres a PascalCase de la UI.
//      */
//     mapFromDatabase(dbPatient) {
//         return {
//             id: dbPatient.id,
//             Id: dbPatient.id,
//             RolId: dbPatient.rol_id,
//             Name: dbPatient.name,
//             FirstSurname: dbPatient.first_surname,
//             SecondSurname: dbPatient.second_surname,
//             Image: dbPatient.image,
//             Age: dbPatient.age,
//             Sexo: dbPatient.sexo,
//             BirthDate: dbPatient.birth_date,
//             PlaceOfBirth: dbPatient.place_of_birth,
//             Occupation: dbPatient.occupation,
//             MaritalStatus: dbPatient.marital_status,
//             Address: dbPatient.address,
//             IdentityCard: dbPatient.identity_card,
//             Email: dbPatient.email,
//             Phone: dbPatient.phone,
//             personalQuestions: dbPatient.personal_questions || {},
//             pathologicalQuestions: dbPatient.pathological_questions || {},
//             womenQuestions: dbPatient.women_questions || {},
//             createdAt: dbPatient.created_at
//         };
//     }

//     /**
//      * Obtiene todos los pacientes.
//      * Consulta Supabase y actualiza la caché local de respaldo.
//      * @returns {Promise<Array>} Lista de pacientes.
//      */
//     async getAllPatients() {
//         try {
//             console.log("Obteniendo pacientes de Supabase");
//             const { data, error } = await supabase
//                 .from('patients')
//                 .select('*')
//                 .order('created_at', { ascending: false });

//             if (error) {
//                 console.error("Error al leer de Supabase, usando local storage:", error);
//                 return this.getAllPatientsLocal();
//             }

//             const parsedPatients = data.map(p => this.mapFromDatabase(p));

//             try {
//                 localStorage.setItem(this.storageKey, JSON.stringify(parsedPatients));
//             } catch (e) {
//                 console.warn("No se pudo escribir en local storage caché:", e);
//             }

//             return parsedPatients;
//         } catch (error) {
//             console.error("Error al obtener pacientes:", error);
//             return this.getAllPatientsLocal();
//         }
//     }

//     /**
//      * Retorna los datos locales de respaldo.
//      */
//     getAllPatientsLocal() {
//         try {
//             const data = localStorage.getItem(this.storageKey);
//             return data ? JSON.parse(data) : [];
//         } catch (error) {
//             console.error("Error al leer caché local:", error);
//             return [];
//         }
//     }

//     /**
//      * Guarda o actualiza un paciente en Supabase y local storage.
//      * @param {Object} patientData Datos del paciente de la UI.
//      * @returns {Promise<boolean>} True si la operación se realizó con éxito.
//      */
//     async saveOrUpdatePatient(patientData) {
//         try {
//             const mapped = this.mapToDatabase(patientData);

//             const { error } = await supabase
//                 .from('patients')
//                 .upsert(mapped, { onConflict: 'id' });

//             if (error) {
//                 console.error("Error al guardar en Supabase:", error);
//                 throw error;
//             }

//             // Sincronizar en local storage
//             const localPatients = this.getAllPatientsLocal();
//             const index = localPatients.findIndex(p => p.id === mapped.id);
//             const uiPatient = this.mapFromDatabase(mapped);

//             if (index !== -1) {
//                 localPatients[index] = uiPatient;
//             } else {
//                 localPatients.unshift(uiPatient);
//             }

//             try {
//                 localStorage.setItem(this.storageKey, JSON.stringify(localPatients));
//             } catch (e) {
//                 console.warn("No se pudo escribir en local storage caché:", e);
//             }

//             return true;
//         } catch (error) {
//             console.error("Error en saveOrUpdatePatient, cayendo a local storage:", error);
//             try {
//                 const localPatients = this.getAllPatientsLocal();
//                 const id = patientData.id || patientData.Id || crypto.randomUUID();
//                 const localData = {
//                     ...patientData,
//                     id,
//                     Id: id,
//                     createdAt: new Date().toISOString()
//                 };

//                 const index = localPatients.findIndex(p => p.id === id);
//                 if (index !== -1) {
//                     localPatients[index] = localData;
//                 } else {
//                     localPatients.unshift(localData);
//                 }
//                 localStorage.setItem(this.storageKey, JSON.stringify(localPatients));
//                 return true;
//             } catch (e) {
//                 return false;
//             }
//         }
//     }

//     /**
//      * Limpia la base local y podría borrar todo en Supabase (opcional).
//      */
//     async clearAll() {
//         localStorage.removeItem(this.storageKey);
//     }
// }

// export const userService = new UserService();