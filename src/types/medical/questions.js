// src/types/medical/questions.js

/**
 * @interface MedicalQuestion
 * @property {number} id - ID único de la pregunta
 * @property {string} question_text - Texto de la pregunta (ej: ¿Usted fuma?)
 * @property {boolean} requires_reason - Si despliega el campo de "Por qué"
 * @property {string} reason_label - Label para el campo de razón
 * @property {string} created_at - Fecha de creación ISO String
 * @property {boolean} state - Estado de activación de la pregunta
 */

/**
 * @interface GroupQuestion
 * @property {number} id - ID de la relación
 * @property {number} group_id - ID del grupo asignado
 * @property {string} question_type - Tipo de pregunta (ej: 'Man:')
 * @property {number} medical_question_id - ID de la pregunta relacionada
 * @property {string} created_at - Fecha de creación
 * @property {boolean} state - Estado de la relación
 * @property {MedicalQuestion} [medical_questions] - Objeto de la pregunta anidada en los JOINs
 */

// Exportamos un objeto vacío para convertir el archivo en un módulo ES6 válido
export const QuestionsTypes = {};