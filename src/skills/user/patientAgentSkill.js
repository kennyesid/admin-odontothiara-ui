import { getPatients, getPatientById, getPatientByIdentityCard, createPatient, updatePatient, deletePatient } from '../services/userService';

/**
 * Skills de Agente para la gestión de Pacientes en la Clínica Odontológica.
 * Estos objetos definen el contrato (metadatos) que la IA lee para saber cuándo y cómo usarlos.
 */
export const patientAgentSkills = [
    {
        name: "listar_pacientes",
        description: "Útil cuando el usuario quiere ver la lista completa de pacientes activos registrados en el sistema.",
        parameters: {
            type: "object",
            properties: {},
            required: []
        },
        execute: async () => {
            try {
                const patients = await getPatients();
                return {
                    success: true,
                    count: patients.length,
                    data: patients,
                    message: "Se obtuvieron los pacientes correctamente."
                };
            } catch (error) {
                return { success: false, error: error.message };
            }
        }
    },
    {
        name: "buscar_paciente_por_carnet",
        description: "Busca un paciente específico utilizando su número de carnet de identidad (identity_card).",
        parameters: {
            type: "object",
            properties: {
                identityCard: {
                    type: "string",
                    description: "Número de carnet de identidad del paciente a buscar."
                }
            },
            required: ["identityCard"]
        },
        execute: async ({ identityCard }) => {
            try {
                const patient = await getPatientByIdentityCard(identityCard);
                if (!patient) {
                    return { success: false, message: "No se encontró ningún paciente con ese carnet." };
                }
                return { success: true, data: patient };
            } catch (error) {
                return { success: false, error: error.message };
            }
        }
    },
    {
        name: "registrar_paciente",
        description: "Registra un nuevo paciente en la base de datos de Supabase.",
        parameters: {
            type: "object",
            properties: {
                patientData: {
                    type: "object",
                    description: "Objeto con los datos del paciente (name, first_surname, phone, identity_card, age, etc.) respetando el esquema de la tabla."
                }
            },
            required: ["patientData"]
        },
        execute: async ({ patientData }) => {
            try {
                const newPatient = await createPatient(patientData);
                return {
                    success: true,
                    data: newPatient,
                    message: "Paciente registrado exitosamente."
                };
            } catch (error) {
                return { success: false, error: error.message };
            }
        }
    },
    {
        name: "actualizar_paciente",
        description: "Actualiza los datos de un paciente existente buscando por su ID.",
        parameters: {
            type: "object",
            properties: {
                id: {
                    type: "number",
                    description: "ID único del paciente."
                },
                updates: {
                    type: "object",
                    description: "Campos específicos que se desean modificar."
                }
            },
            required: ["id", "updates"]
        },
        execute: async ({ id, updates }) => {
            try {
                const updated = await updatePatient(id, updates);
                if (!updated) {
                    return { success: false, message: "No se pudo actualizar o el paciente no existe." };
                }
                return { success: true, data: updated, message: "Paciente actualizado correctamente." };
            } catch (error) {
                return { success: false, error: error.message };
            }
        }
    },
    {
        name: "eliminar_paciente",
        description: "Realiza una eliminación lógica (cambia el estado a false) de un paciente por su ID.",
        parameters: {
            type: "object",
            properties: {
                id: {
                    type: "number",
                    description: "ID del paciente a eliminar."
                }
            },
            required: ["id"]
        },
        execute: async ({ id }) => {
            try {
                const success = await deletePatient(id);
                return {
                    success,
                    message: success ? "Paciente eliminado lógicamente." : "No se pudo eliminar el paciente."
                };
            } catch (error) {
                return { success: false, error: error.message };
            }
        }
    }
];