import { DatabaseService } from "@/lib/database/databaseService";

// ========================================================
// INSTANCIA DE DatabaseService PARA PATIENTS
// ========================================================
// const groupId = configService ? configService.getGroupId() : 1;
const groupId = 1;
// Tercer parámetro en 'true' porque la tabla 'patients' sí tiene la columna 'group_id' (o 'groupId' según tu esquema)
const patientDatabaseService = new DatabaseService('patients', groupId, true);

// ========================================================
// PATIENT SERVICES
// ========================================================

export async function getAllPatients() {
    try {
        const patients = await patientDatabaseService.getAll('id', true);
        return {
            code: 200,
            message: "Pacientes obtenidos con éxito",
            content: patients
        };
    } catch (error) {
        console.error("Error en getAllPatients:", error.message);
        return {
            code: 500,
            message: "Error al obtener la lista de pacientes",
            content: []
        };
    }
}

/**
 * Obtener un paciente por su ID.
 */
export async function getPatientById(id) {
    try {
        const patient = await patientDatabaseService.getByField('id', id);
        if (!patient) {
            return {
                code: 404,
                message: "Paciente no encontrado",
                content: null
            };
        }
        return {
            code: 200,
            message: "Paciente obtenido con éxito",
            content: patient
        };
    } catch (error) {
        console.error("Error en getPatientById:", error.message);
        return {
            code: 500,
            message: "Error al buscar el paciente por ID",
            content: null
        };
    }
}

/**
 * Obtener un paciente por número de carnet de identidad.
 */
export async function getPatientByIdentityCard(identityCard) {
    try {
        const patient = await patientDatabaseService.getByField('identity_card', identityCard);
        if (!patient) {
            return {
                code: 404,
                message: "Paciente no encontrado con ese carnet",
                content: null
            };
        }
        return {
            code: 200,
            message: "Paciente obtenido por carnet con éxito",
            content: patient
        };
    } catch (error) {
        console.error("Error en getPatientByIdentityCard:", error.message);
        return {
            code: 500,
            message: "Error al buscar el paciente por carnet",
            content: null
        };
    }
}

/**
 * Crear un nuevo paciente.
 */
export async function createPatient(patientData) {
    try {
        const newPatient = await patientDatabaseService.create(patientData);
        return {
            code: 201,
            message: "Paciente creado con éxito",
            content: newPatient
        };
    } catch (error) {
        console.error("Error en createPatient:", error.message);
        return {
            code: 400,
            message: "Error al registrar el paciente",
            content: null
        };
    }
}

/**
 * Actualizar los datos de un paciente.
 */
export async function saveOrUpdatePatient(patient) {
    try {
        let result;
        let statusCode = 200;
        let successMessage = "";

        // Verificamos si tiene un ID válido para decidir si actualizamos o creamos
        if (patient.id) {
            // Intentamos actualizar
            const updates = { ...patient };
            delete updates.id; // Evitamos mandar el ID en el objeto de campos a actualizar por seguridad

            const updatedPatient = await patientDatabaseService.update('id', patient.id, updates);

            if (updatedPatient) {
                result = updatedPatient;
                successMessage = "Paciente actualizado con éxito";
            } else {
                // Si el ID venía pero no se encontró en la base de datos, lo creamos (o forzamos inserción)
                result = await patientDatabaseService.create(patient);
                statusCode = 201;
                successMessage = "Paciente creado con éxito (ID no encontrado previamente)";
            }
        } else {
            // No tiene ID, por lo tanto es un registro nuevo
            const newPatientData = { ...patient };
            delete newPatientData.id; // Limpiamos por si viene vacío o null

            result = await patientDatabaseService.create(newPatientData);
            statusCode = 201;
            successMessage = "Paciente creado con éxito";
        }

        return {
            code: statusCode,
            message: successMessage,
            content: result
        };

    } catch (error) {
        console.error("Error en saveOrUpdatePatient:", error.message);
        return {
            code: 400,
            message: "Error al guardar o actualizar el paciente",
            content: null
        };
    }
}
// export async function saveOrUpdatePatient(patient) {
//     try {
//         const id = patient.id;
//         const updates = patient;
//         // console.log('Actualizando paciente:', JSON.stringify(updates));
//         const updatedPatient = await patientDatabaseService.update('id', id, updates);

//         if (!updatedPatient) {
//             return {
//                 code: 404,
//                 message: "Paciente no encontrado para actualizar",
//                 content: null
//             };
//         }

//         return {
//             code: 200,
//             message: "Paciente actualizado con éxito",
//             content: updatedPatient
//         };
//     } catch (error) {
//         console.error("Error en saveOrUpdatePatient:", error.message);
//         return {
//             code: 400,
//             message: "Error al actualizar el paciente",
//             content: null
//         };
//     }
// }

/**
 * Eliminar lógicamente un paciente (cambia state a false).
 */
export async function deletePatient(id) {
    try {
        const result = await patientDatabaseService.update('id', id, { state: false });

        if (!result) {
            return {
                code: 404,
                message: "Paciente no encontrado para eliminación lógica",
                content: false
            };
        }

        return {
            code: 200,
            message: "Paciente eliminado lógicamente con éxito",
            content: true
        };
    } catch (error) {
        console.error("Error en deletePatient:", error.message);
        return {
            code: 500,
            message: "Error al eliminar el paciente",
            content: false
        };
    }
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