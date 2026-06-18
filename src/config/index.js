// Validar que las variables críticas existan antes de arrancar la aplicación
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        // Lanzamos un error explícito para detener el proceso si falta algo vital
        throw new Error(`[Config Error]: La variable de entorno obligatoria ${envVar} no está definida.`);
    }
}

// Estructurar el objeto de configuración centralizado
const config = {
    app: {
        env: process.env.NODE_ENV || 'development',
        port: parseInt(process.env.PORT, 10) || 4000,
        isProduction: process.env.NODE_ENV === 'production'
    },
    database: {
        url: process.env.REACT_APP_SUPABASE_URL,
        secretKey: process.env.REACT_APP_SUPABASE_ANON_KEY,
        // Ejemplo de casteo a número para configuraciones de pool
        maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS, 10) || 10
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d'
    },
    services: {
        // Ejemplo de un flag booleano parseado correctamente
        enableMockServices: process.env.ENABLE_MOCK_SERVICES === 'true'
    }
};

// Object.freeze previene que otras partes del código alteren la configuración original
export default Object.freeze(config);