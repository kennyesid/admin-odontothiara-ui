import { DatabaseService } from '@/lib/database/databaseService';
// import { configService } from './configService';

// const groupId = configService ? configService.getGroupId() : 1;
const groupId = 1;
// Tercer parámetro en 'true' porque la tabla cuenta con la columna 'group_id'
const medicalAnswerDatabaseService = new DatabaseService('patient_medical_answers', groupId, true);

/**
 * Obtener todas las respuestas médicas activas del grupo actual.
 */
export async function getAllPatientMedicalAnswers() {
    try {
        const answers = await medicalAnswerDatabaseService.getAll('id', true);
        return {
            code: 200,
            message: "Respuestas médicas obtenidas con éxito",
            content: answers
        };
    } catch (error) {
        console.error("Error en getAllPatientMedicalAnswers:", error.message);
        return {
            code: 500,
            message: "Error al obtener las respuestas médicas",
            content: []
        };
    }
}

/**
 * Obtener una respuesta médica por su ID.
 */
export async function getPatientMedicalAnswerById(id) {
    try {
        const answer = await medicalAnswerDatabaseService.getByField('id', id);
        if (!answer) {
            return {
                code: 404,
                message: "Respuesta médica no encontrada",
                content: null
            };
        }
        return {
            code: 200,
            message: "Respuesta médica obtenida con éxito",
            content: answer
        };
    } catch (error) {
        console.error("Error en getPatientMedicalAnswerById:", error.message);
        return {
            code: 500,
            message: "Error al buscar la respuesta médica por ID",
            content: null
        };
    }
}

/**
 * Obtener todas las respuestas médicas de un paciente específico por su patient_id.
 */
export async function getAnswersByPatientId(patientId) {
    try {
        // Usamos el DatabaseService filtrando por la columna 'patient_id'
        const answers = await medicalAnswerDatabaseService.getAll('id', true);
        const filteredAnswers = answers.filter(item => String(item.patient_id) === String(patientId));

        return {
            code: 200,
            message: "Respuestas del paciente obtenidas con éxito",
            content: filteredAnswers
        };
    } catch (error) {
        console.error("Error en getAnswersByPatientId:", error.message);
        return {
            code: 500,
            message: "Error al obtener las respuestas del paciente",
            content: []
        };
    }
}

/**
 * Crear una nueva respuesta médica.
 */
export async function createPatientMedicalAnswer(answerData) {
    try {
        const newAnswer = await medicalAnswerDatabaseService.create(answerData);
        return {
            code: 201,
            message: "Respuesta médica creada con éxito",
            content: newAnswer
        };
    } catch (error) {
        console.error("Error en createPatientMedicalAnswer:", error.message);
        return {
            code: 400,
            message: "Error al registrar la respuesta médica",
            content: null
        };
    }
}

/**
 * Actualizar una respuesta médica existente.
 */
export async function updatePatientMedicalAnswer(id, updates) {
    try {
        console.log('Actualizando respuesta médica:', JSON.stringify(updates));
        const updatedAnswer = await medicalAnswerDatabaseService.update('id', id, updates);

        if (!updatedAnswer) {
            return {
                code: 404,
                message: "Respuesta médica no encontrada para actualizar",
                content: null
            };
        }

        return {
            code: 200,
            message: "Respuesta médica actualizada con éxito",
            content: updatedAnswer
        };
    } catch (error) {
        console.error("Error en updatePatientMedicalAnswer:", error.message);
        return {
            code: 400,
            message: "Error al actualizar la respuesta médica",
            content: null
        };
    }
}

/**
 * Eliminar lógicamente una respuesta médica (cambia state a false).
 */
export async function deletePatientMedicalAnswer(id) {
    try {
        const result = await medicalAnswerDatabaseService.update('id', id, { state: false });

        if (!result) {
            return {
                code: 404,
                message: "Respuesta médica no encontrada para eliminación lógica",
                content: false
            };
        }

        return {
            code: 200,
            message: "Respuesta médica eliminada lógicamente con éxito",
            content: true
        };
    } catch (error) {
        console.error("Error en deletePatientMedicalAnswer:", error.message);
        return {
            code: 500,
            message: "Error al eliminar la respuesta médica",
            content: false
        };
    }
}