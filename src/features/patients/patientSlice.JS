import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_PATIENT_STATE } from '../../constants/UserConstants';
// import { INITIAL_PATIENT_STATE } from '@/constants/UserConstants';
import { userService } from '@/services/user/UserService';

const patientSlice = createSlice({
    name: 'patient',
    initialState: INITIAL_PATIENT_STATE,
    reducers: {
        // Actualiza campos de primer nivel (Name, Age, etc.)
        updatePatientField: (state, action) => {
            const { field, value } = action.payload;
            if (field in state) {
                state[field] = value;
            }
        },
        // Actualiza campos anidados (personalQuestions, pathologicalQuestions, etc.)
        updateNestedField: (state, action) => {
            const { section, field, value } = action.payload;
            if (state[section] && field in state[section]) {
                state[section][field] = value;
            }
        },
        // Resetear el formulario al estado inicial
        resetPatient: () => INITIAL_PATIENT_STATE,

        getAllPatients: () => {
            return userService.getAllPatients();
        },

        // Cargar un paciente existente (para edición)
        setPatient: (state, action) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { updatePatientField, updateNestedField, resetPatient, setPatient } = patientSlice.actions;
export default patientSlice.reducer;