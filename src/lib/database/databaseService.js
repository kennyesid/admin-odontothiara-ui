// src/lib/databaseService.js
import { supabase } from './supabaseClient';

/**
 * Servicio genérico para operaciones CRUD con Supabase.
 * Ahora soporta múltiples groupId mediante array.
 */
export class DatabaseService {
    /**
     * @param {string} tableName - Nombre de la tabla en Supabase
     * @param {number[]} groupIds - Array de IDs de grupo (por defecto [1])
     * @param {boolean} hasGroupId - Si la tabla tiene columna 'groupId'
     */
    constructor(tableName, group_id = [1], hasGroupId = false) {
        this.tableName = tableName;
        this.group_id = Array.isArray(group_id) ? group_id : [group_id];
        this.hasGroupId = hasGroupId;
    }

    /**
     * Construye la consulta base con filtros de grupo si corresponde.
     * @param {import('@supabase/supabase-js').SupabaseQueryBuilder} query
     * @returns {import('@supabase/supabase-js').SupabaseQueryBuilder}
     */
    _applyGroupFilter(query) {
        if (!this.hasGroupId) return query;

        if (this.group_id.length === 1) {
            // Un solo grupo → filtro con eq
            return query.eq('group_id', this.group_id[0]);
        } else if (this.group_id.length > 1) {
            // Múltiples grupos → filtro con in
            return query.in('group_id', this.group_id);
        }
        // Si no hay groupIds, no filtrar (devolver query sin cambios)
        return query;
    }

    /**
     * Obtiene todos los registros activos (state = true) con orden opcional.
     * @param {string} orderBy - Columna por la que ordenar (por defecto 'id')
     * @param {boolean} ascending - Orden ascendente (true) o descendente (false)
     * @returns {Promise<Array>}
     */
    async getAll(orderBy = 'id', ascending = true) {
        let query = supabase
            .from(this.tableName)
            .select('*')
            .eq('state', true);

        // Aplicar filtro de grupo si corresponde
        query = this._applyGroupFilter(query);

        const { data, error } = await query.order(orderBy, { ascending });

        if (error) {
            console.error(`Error en getAll de la tabla ${this.tableName}:`, error.message);
            throw error;
        }
        return data;
    }

    /**
     * Obtiene un único registro por un campo y valor, aplicando filtro de grupo.
     * @param {string} column - Nombre de la columna
     * @param {*} value - Valor a buscar
     * @returns {Promise<Object|null>}
     */
    async getByField(column, value) {
        let query = supabase
            .from(this.tableName)
            .select('*')
            .eq(column, value);

        // Aplicar filtro de grupo si corresponde
        query = this._applyGroupFilter(query);

        const { data, error } = await query.single();

        if (error) {
            if (error.code === 'PGRST116') return null; // No encontrado
            console.error(`Error en getByField en ${this.tableName}:`, error.message);
            throw error;
        }
        return data;
    }

    /**
     * Crea un nuevo registro. Si la tabla tiene groupId, se asigna automáticamente
     * el primer ID del array (o el que se pase en el objeto).
     * @param {Object} item - Datos a insertar (sin id, createdAt, updatedAt)
     * @param {number} [customGroupId] - Opcional: groupId específico para este registro
     * @returns {Promise<Object>}
     */
    async create(item, customGroupId = null) {
        // Si la tabla usa groupId, asignamos el primero del array por defecto
        // pero permitimos sobrescribir con customGroupId
        let itemToInsert = { ...item };

        if (this.hasGroupId) {
            const groupIdToUse = customGroupId !== null ? customGroupId : (this.group_id.length > 0 ? this.group_id[0] : 1);
            itemToInsert.group_id = groupIdToUse;
        }

        const { data, error } = await supabase
            .from(this.tableName)
            .insert([itemToInsert])
            .select()
            .single();

        if (error) {
            console.error(`Error en create de la tabla ${this.tableName}:`, error.message);
            throw error;
        }
        return data;
    }

    /**
     * Actualiza un registro buscando por una columna, aplicando filtro de grupo.
     * @param {string} column - Columna para filtrar (ej. 'id')
     * @param {*} value - Valor de la columna
     * @param {Object} updates - Campos a actualizar
     * @returns {Promise<Object|null>}
     */
    async update(column, value, updates) {
        let query = supabase
            .from(this.tableName)
            .update(updates)
            .eq(column, value);

        // Aplicar filtro de grupo si corresponde
        query = this._applyGroupFilter(query);

        const { data, error } = await query.select().single();

        if (error) {
            if (error.code === 'PGRST116') return null;
            console.error(`Error en update de la tabla ${this.tableName}:`, error.message);
            throw error;
        }
        return data;
    }

    /**
     * Elimina (DELETE) un registro buscando por columna y aplicando filtro de grupo.
     * @param {string} column - Columna para filtrar
     * @param {*} value - Valor de la columna
     * @returns {Promise<boolean>}
     */
    async delete(column, value) {
        let query = supabase
            .from(this.tableName)
            .delete()
            .eq(column, value);

        // Aplicar filtro de grupo si corresponde
        query = this._applyGroupFilter(query);

        const { error } = await query;

        if (error) {
            console.error(`Error en delete de la tabla ${this.tableName}:`, error.message);
            return false;
        }
        return true;
    }
}

// src/lib/storageService.js (o dentro del mismo archivo)

/**
 * Sube una imagen directamente desde un objeto File (input type="file").
 * @param {File} file - Archivo de imagen
 * @param {string} bucket - Nombre del bucket en Supabase (por defecto 'product-images')
 * @param {string} folder - Carpeta dentro del bucket (por defecto 'products')
 * @returns {Promise<string|null>} - URL pública de la imagen o null si falla
 */
export async function uploadProductImage(file, bucket = 'product-images', folder = 'products') {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) throw error;

        const { data: publicUrlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);

        return publicUrlData.publicUrl;
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        return null;
    }
}

/**
 * Sube una imagen desde una cadena base64.
 * @param {string} base64String - Datos de la imagen en base64 (con o sin prefijo)
 * @param {string} folder - Carpeta dentro del bucket (por defecto 'products')
 * @param {string} [fileName] - Nombre opcional del archivo
 * @param {string} bucket - Nombre del bucket (por defecto 'product-images')
 * @returns {Promise<string>} - URL pública de la imagen
 */
export async function uploadImageToSupabase(
    base64String,
    folder = 'products',
    fileName = null,
    bucket = 'product-images'
) {
    const base64Data = base64String.split(',')[1];
    const mimeType = base64String.match(/data:(image\/\w+);/)?.[1] || 'image/jpeg';
    const blob = Buffer.from(base64Data, 'base64');

    const finalFileName = fileName || `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${mimeType.split('/')[1]}`;
    const filePath = `${folder}/${finalFileName}`;

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, blob, {
            contentType: mimeType,
            cacheControl: '3600',
            upsert: true,
        });

    if (error) {
        throw new Error(`Error al subir imagen: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
}