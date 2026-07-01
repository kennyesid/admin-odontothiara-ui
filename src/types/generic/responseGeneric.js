/**
 * @template T
 * @interface ResponseGenericDto
 * @property {number} code - Código de estado HTTP o interno
 * @property {string} message - Descripción del resultado de la operación
 * @property {T | null} content - Datos devueltos por el servicio
 */

// Helpers para estructurar las respuestas del servicio
export const ResponseSuccess = (content, message = "Operación exitosa", code = 200) => {
    return {
        code,
        message,
        content
    };
};

export const ResponseFail = (message = "Hubo un error en la operación", code = 500, content = null) => {
    return {
        code,
        message,
        content
    };
};

export const ResponseGeneric = {};