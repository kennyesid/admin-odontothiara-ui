class UserService {
    constructor() {
        this.storageKey = 'app_patients_list';
    }

    /**
     * Obtiene todos los pacientes almacenados.
     * @returns {Array} Lista de objetos de pacientes.
     */
    getAllPatients() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error("Error al leer de localStorage:", error);
            return [];
        }
    }

    /**
     * Guarda un nuevo paciente en la lista existente.
     * @param {Object} patientData Datos del paciente a registrar.
     * @returns {boolean} True si se guardó con éxito.
     */
    savePatient(patientData) {
        try {
            const patients = this.getAllPatients();

            // Asignar un ID único temporal si no tiene uno
            const newEntry = {
                ...patientData,
                id: patientData.id || crypto.randomUUID(),
                // createdAt: new Date().toISOString()
            };

            patients.push(newEntry);
            localStorage.setItem(this.storageKey, JSON.stringify(patients));
            return true;
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
            return false;
        }
    }

    saveOrUpdatePatient(patientData) {
        try {
            const patients = this.getAllPatients();
            const index = patients.findIndex(p => p.id === patientData.id);

            if (index !== -1) {
                patients[index] = {
                    ...patients[index],
                    ...patientData
                };
            } else {
                const newEntry = {
                    ...patientData,
                    id: patientData.id || crypto.randomUUID(),
                    createdAt: new Date().toISOString()
                };
                patients.push(newEntry);
            }

            localStorage.setItem(this.storageKey, JSON.stringify(patients));
            return true;
        } catch (error) {
            console.error("Error al persistir en localStorage:", error);
            return false;
        }
    }

    /**
     * Limpia todos los registros (opcional).
     */
    clearAll() {
        localStorage.removeItem(this.storageKey);
    }
}

export const userService = new UserService();