// services/medicalQuestionsService.js
import { DatabaseService } from '@/lib/database/databaseService';
import { supabase } from '@/lib/database/supabaseClient';
// import { configService } from './configService';

// ========================================================
// DEFINICIÓN DE INTERFACES (Vía JSDoc para Autocompletado)
// ========================================================

// /**
//  * @interface MedicalQuestion
//  * @property {number} id - ID único de la pregunta
//  * @property {string} question_text - Texto de la pregunta (ej: ¿Usted fuma?)
//  * @property {boolean} requires_reason - Si despliega el campo de "Por qué"
//  * @property {string} reason_label - Label para el campo de razón
//  * @property {string} created_at - Fecha de creación ISO String
//  * @property {boolean} state - Estado de activación de la pregunta
//  */

// /**
//  * @interface GroupQuestion
//  * @property {number} id - ID de la relación
//  * @property {number} group_id - ID del grupo asignado
//  * @property {string} question_type - Tipo de pregunta (ej: 'Man')
//  * @property {number} medical_question_id - ID de la pregunta relacionada
//  * @property {string} created_at - Fecha de creación
//  * @property {boolean} state - Estado de la relación
//  * @property {MedicalQuestion} [medical_questions] - Objeto de la pregunta anidada en los JOINs
//  */

// ========================================================
// INSTANCIAS DE DatabaseService
// ========================================================
// const groupId = configService.getGroupId();
// const groupId = 1;

// const medicalQuestionService = new DatabaseService('medical_questions', groupId, true);
// const groupQuestionService = new DatabaseService('group_questions', groupId, true);

// ========================================================
// MEDICAL QUESTIONS SERVICES (Catálogo Base)
// ========================================================
// /**
//  * Obtener todas las preguntas médicas del catálogo que estén activas
//  * @returns {Promise<import('@/types/generic/responseGeneric').ResponseGenericDto<import('@/types/medical/questions').MedicalQuestion[]>>}
//  */
// export async function getMedicalQuestions() {
//     try {
//         const data = await medicalQuestionService.getAll('id', true);
//         return responderExito(data || [], "Preguntas del catálogo obtenidas con éxito");
//     } catch (error) {
//         console.error("❌ Error en getMedicalQuestions:", error);
//         return responderFalla(`Error al obtener preguntas: ${error?.message || 'Error de base de datos'}`);
//     }
// }

// /**
//  * Obtener una pregunta médica específica por su ID
//  * @param {number} id 
//  * @returns {Promise<import('@/types/generic/responseGeneric').ResponseGenericDto<import('@/types/medical/questions').MedicalQuestion>>}
//  */
// export async function getMedicalQuestionById(id) {
//     try {
//         const data = await medicalQuestionService.getByField('id', id);
//         if (!data) return responderFalla("No se encontró la pregunta médica", 404);

//         return responderExito(data, "Pregunta médica obtenida con éxito");
//     } catch (error) {
//         console.error(`❌ Error en getMedicalQuestionById para ID ${id}:`, error);
//         return responderFalla(`Error al obtener la pregunta: ${error?.message || 'Error de base de datos'}`);
//     }
// }

// /**
//  * Crear una nueva pregunta en el catálogo
//  * @param {Omit<import('@/types/medical/questions').MedicalQuestion, 'id' | 'created_at'>} question 
//  * @returns {Promise<import('@/types/generic/responseGeneric').ResponseGenericDto<import('@/types/medical/questions').MedicalQuestion>>}
//  */
// export async function createMedicalQuestion(question) {
//     try {
//         const data = await medicalQuestionService.create(question);
//         return responderExito(data, "Pregunta médica creada con éxito", 201);
//     } catch (error) {
//         console.error("❌ Error en createMedicalQuestion:", error);
//         return responderFalla(`Error al crear la pregunta: ${error?.message || 'Error de base de datos'}`);
//     }
// }

// /**
//  * Actualizar los campos de una pregunta del catálogo
//  * @param {number} id 
//  * @param {Partial<import('@/types/medical/questions').MedicalQuestion>} updates 
//  * @returns {Promise<import('@/types/generic/responseGeneric').ResponseGenericDto<import('@/types/medical/questions').MedicalQuestion>>}
//  */
// export async function updateMedicalQuestion(id, updates) {
//     try {
//         const data = await medicalQuestionService.update('id', id, updates);
//         if (!data) return responderFalla("No se encontró la pregunta para actualizar", 404);

//         return responderExito(data, "Pregunta médica actualizada con éxito");
//     } catch (error) {
//         console.error(`❌ Error en updateMedicalQuestion para ID ${id}:`, error);
//         return responderFalla(`Error al actualizar la pregunta: ${error?.message || 'Error de base de datos'}`);
//     }
// }

// /**
//  * Desactivar lógicamente una pregunta del catálogo (Cambia state a false)
//  * @param {number} id 
//  * @returns {Promise<import('@/types/generic/responseGeneric').ResponseGenericDto<boolean>>}
//  */
// export async function deleteMedicalQuestion(id) {
//     try {
//         const res = await medicalQuestionService.update('id', id, { state: false });
//         if (!res) return responderFalla("No se encontró la pregunta para eliminar", 404);

//         return responderExito(true, "Pregunta médica eliminada con éxito");
//     } catch (error) {
//         console.error(`❌ Error en deleteMedicalQuestion para ID ${id}:`, error);
//         return responderFalla(`Error al eliminar la pregunta: ${error?.message || 'Error de base de datos'}`);
//     }
// }

// // ========================================================
// // CONSULTAS COMPLEJAS (Conexión Directa a Supabase para JOINs)
// // ========================================================

// /**
//  * Obtiene las preguntas asignadas dinámicamente al grupo del paciente actual.
//  * @param {number} currentPatientGroupId - ID del grupo al que pertenece el paciente
//  * @param {string} [type='Man'] - Por defecto seteado en 'Man' limpio
//  * @returns {Promise<import('@/types/generic/responseGeneric').ResponseGenericDto<import('@/types/medical/questions').GroupQuestion[]>>}
//  */
// export async function getActiveQuestionsForGroup(currentPatientGroupId, type = 'Man') {
//     try {
//         const { data, error } = await supabase
//             .from('group_questions')
//             .select(`
//         id,
//         group_id,
//         question_type,
//         medical_question_id,
//         state,
//         medical_questions (
//           id,
//           question_text,
//           requires_reason,
//           reason_label,
//           state
//         )
//       `)
//             .eq('group_id', currentPatientGroupId)
//             .eq('question_type', type)
//             .eq('state', true)
//             .eq('medical_questions.state', true);

//         if (error) throw error;

//         const filteredData = (data || []).filter(item => item.medical_questions !== null);
//         return ResponseSuccess(filteredData, "Preguntas del grupo obtenidas con éxito");
//     } catch (error) {
//         console.error("❌ Error en getActiveQuestionsForGroup:", error);
//         return ResponseFail(`Error al obtener preguntas del grupo: ${error?.message || 'Error de base de datos'}`);
//     }
// }

// /**
//  * Obtiene el listado plano de preguntas asignadas a un grupo específico (Equivalente a tu INNER JOIN SQL)
//  * @returns {Promise<import('@/types/generic/responseGeneric').ResponseGenericDto<Array<{id: number, question_type: string, question_text: string, requires_reason: boolean, reason_label: string}>>>}
//  */
// export async function getFlatQuestionsByGroupId() {
//     try {
//         const { data, error } = await supabase
//             .from('group_questions')
//             .select(`
//         id,
//         question_type,
//         medical_questions!inner (
//           question_text,
//           requires_reason,
//           reason_label,
//           state
//         )
//       `)
//             .eq('group_id', groupId)
//             .eq('state', true)                             // gq.state = true
//             .eq('medical_questions!inner.state', true);    // mq.state = true (Garantiza el INNER JOIN)

//         if (error) throw error;

//         // Mapeamos el resultado para aplanar la estructura exactamente como tu consulta SQL
//         const flatData = (data || []).map(item => ({
//             id: item.id,
//             question_type: item.question_type,
//             question_text: item.medical_questions.question_text,
//             requires_reason: item.medical_questions.requires_reason,
//             reason_label: item.medical_questions.reason_label
//         }));

//         return ResponseSuccess(flatData, "Preguntas del grupo obtenidas en formato plano con éxito");
//     } catch (error) {
//         console.error(`❌ Error en getFlatQuestionsByGroupId para grupo ${groupId}:`, error);
//         return ResponseFail(`Error al ejecutar consulta de preguntas: ${error?.message || 'Error de base de datos'}`);
//     }
// }


// CAMBIOS PARA VERIFICAR

const groupId = 1;

const medicalQuestionService = new DatabaseService('medical_questions', groupId, true);
const groupQuestionService = new DatabaseService('group_questions', groupId, true);

/**
 * Obtiene el listado plano de preguntas asignadas a un grupo específico
 */
export async function getFlatQuestionsByGroupId() {
    try {
        const { data, error } = await supabase
            .from('group_questions')
            .select(`
                id,
                question_type,
                state, 
                medical_questions!inner (
                  question_text,
                  requires_reason,
                  reason_label,
                  state
                )
            `)
            .eq('group_id', groupId)
            // Filtramos el estado de la relación group_questions
            .eq('state', true)
            // ¡CORREGIDO AQUÍ!: Quitamos el '!inner' del string del filtro
            .eq('medical_questions.state', true);

        if (error) throw error;

        const flatData = (data || []).map(item => ({
            id: item.id,
            question_type: item.question_type,
            question_text: item.medical_questions?.question_text || '',
            requires_reason: item.medical_questions?.requires_reason || false,
            reason_label: item.medical_questions?.reason_label || ''
        }));

        return {
            code: 200,
            message: "Preguntas del grupo obtenidas en formato plano con éxito",
            content: flatData
        };
    } catch (error) {
        // Si sigue dando error, ahora sí podremos desplegar el objeto completo expandido
        console.error(`❌ Error REAL de Supabase para grupo ${groupId}:`, JSON.stringify(error, null, 2));

        return {
            code: 500,
            message: `Error al ejecutar consulta de preguntas: ${error?.message || 'Error de base de datos'}`,
            content: null
        };
    }
}