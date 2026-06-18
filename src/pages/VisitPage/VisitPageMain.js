// 1. React y librerías externas
import React, { useEffect, useState } from 'react';
// 2. Servicios y Utilidades (Capa de datos)
import { userService } from '@/services/user/UserService';
import { showToast } from '@/utils/showToast';
// 3. Componentes de la aplicación
// import UserForm from './UserForm';
import PatientDataTable from '@/pages/VisitPage/Components/PatientDataTable';
import ButtonGeneric from '@/components/Common/Button/ButtonGeneric';
// 4. Estilos y Constantes
import { STYLE_ROOT } from '@/styles/styleGeneric';
import { INITIAL_PATIENT_STATE } from '@/constants/UserConstants';
import { PatientLayout } from '@/components/Layout/PatientLayout';

const VisitPageMain = () => {
    const [levelSection, setLevelSection] = useState(1);
    const [view, setView] = useState("userIndex");
    const [patients, setPatients] = useState([]);
    const [patientData, setPatientData] = useState(INITIAL_PATIENT_STATE);

    const handleSave = async (intoPatientData) => {
        const responseUserService = await userService.saveOrUpdatePatient(intoPatientData);
        const message = `Guardando paciente:`;

        if (responseUserService) {
            showToast(
                "Registro Exitoso",
                `El paciente ha sido guardado en la base de datos.`,
                "success"
            );
        }
        const updatedPatients = await userService.getAllPatients();
        setPatients(updatedPatients);
        setView("userIndex");
    };

    const handleNewUser = () => {
        setLevelSection(1);
        setView("userForm");
    };

    const handleTestToast = () => {
        showToast(
            "Test Toast",
            "This is a test toast message.",
            "success"
        );
    };

    const handleEdit = (patient) => {
        setPatientData(patient);
        setView("userForm");
    };

    const handleDelete = (patient) => {
        setPatientData(patient);
        setView("userForm");
    };

    useEffect(() => {
        const loadPatients = async () => {
            const data = await userService.getAllPatients();
            setPatients(data);
        };
        loadPatients();
    }, []);

    return (
        <PatientLayout
            header={
                <>
                    <div>
                        <h1 className="text-3xl font-black text-[#052a3d] tracking-tight">
                            Pacientes
                        </h1>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200">
                        {/* Espacio para barra de búsqueda o filtros futuros */}
                    </div>
                </>
            }
            content={
                <>
                    {/* <div className="w-full mb-4">
                        <div className="w-full md:w-1/3 max-w-xs lg:max-w-[30%]">
                            <ButtonGeneric variant="primary" onClick={handleNewUser}>
                                Nuevo Paciente
                            </ButtonGeneric>
                        </div>
                    </div> */}

                    <PatientDataTable
                        patients={patients}
                        onAddNew={() => setView("userForm")}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </>
            }
        />
    );
};

export default VisitPageMain;