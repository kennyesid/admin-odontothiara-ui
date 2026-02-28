// 1. React y librerías externas
import React, { useEffect, useState } from 'react';
// 2. Servicios y Utilidades (Capa de datos)
import { userService } from '@/services/user/UserService';
import { showToast } from '@/utils/showToast';
// 3. Componentes de la aplicación
import UserForm from './UserForm';
import UserDataTable from '@/components/DataTable/UserDataTable';
import ButtonGeneric from '@/components/Common/Button/ButtonGeneric';
// 4. Estilos y Constantes
import { STYLE_ROOT } from '@/styles/styleGeneric';
import { INITIAL_PATIENT_STATE } from '@/constants/UserConstants';

const UserMain = () => {
  const [levelSection, setLevelSection] = useState(1);
  const [view, setView] = useState("userIndex");
  const [patients, setPatients] = useState([]);
  const [patientData, setPatientData] = useState(INITIAL_PATIENT_STATE);
  // const [patientData, setPatientData] = useState({
  //   Id: 0,
  //   RolId: 2,
  //   Name: '',
  //   FirstSurname: '',
  //   SecondSurname: '',
  //   Image: '',
  //   Age: 0,
  //   Sexo: 'Masculino',
  //   BirthDate: new Date().toISOString().split('T')[0],
  //   PlaceOfBirth: '',
  //   Occupation: '',
  //   MaritalStatus: 'S/N',
  //   Address: '',
  //   IdentityCard: '',
  //   Email: '',
  //   Phone: '',

  //   // QuestionPersonal
  //   personalQuestions: {
  //     Smokes: false,
  //     SmokingYears: 0,
  //     DrinksAlcohol: false,
  //     AlcoholDescription: '',
  //     Bruxism: false,
  //     BruxismDescription: '',
  //     ChewsCoca: false,
  //     CocaDescription: '',
  //     State: true
  //   },

  //   // QuestionPathological
  //   pathologicalQuestions: {
  //     Anemia: false,
  //     Diabetes: false,
  //     HeartDisease: false,
  //     Allergies: false,
  //     AllergiesDescription: '',
  //     TakingMedication: false,
  //     Hypertension: false,
  //     OtherConditions: ''
  //   },

  //   // QuestionWomen
  //   womenQuestions: {
  //     IsPregnant: false,
  //     PregnancyTimeMonth: 0,
  //     LastMenstruationDate: new Date().toISOString().split('T')[0],
  //     State: true
  //   }
  // });

  const handleSave = async (intoPatientData) => {
    const responseUserService = userService.saveOrUpdatePatient(intoPatientData);
    const message = `Guardando paciente:`;

    if (responseUserService) {
      showToast(
        "Registro Exitoso",
        `El paciente ha sido guardado en el historial local.`,
        "success"
      );
    }
    setPatients(userService.getAllPatients())
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
    setPatients(userService.getAllPatients());
  }, []);

  return (
    // <div className="h-full w-full font-sans flex flex-col overflow-hidden">
    <>
      {view === "userIndex" ? (
        <div className="flex flex-col h-full overflow-hidden">
          <div className={`mb-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-3 md:px-12 shadow-sm border border-slate-100 flex-shrink-0 ${STYLE_ROOT.roundedPanelMain}`}>
            <div>
              <h1 className="text-3xl font-black text-[#052a3d] tracking-tight">
                Pacientes
              </h1>
            </div>
            {/* <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200">
            </div> */}
          </div>
          <div className={`bg-white shadow-sm border border-slate-100 flex flex-col flex-1 overflow-hidden ${STYLE_ROOT.roundedPanelMain}`}>
            <div className="flex-1 overflow-y-auto p-8 md:px-12 custom-scrollbar">
              <div className="w-full mb-4">
                <div className="w-full md:w-1/3 max-w-xs lg:max-w-[30%]">
                  <ButtonGeneric
                    variant="primary"
                    onClick={handleNewUser}
                  >
                    Nuevo Usuario
                  </ButtonGeneric>
                </div>
              </div>
              <UserDataTable
                patients={patients}
                onAddNew={() => setView("userForm")}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      ) : (
        <UserForm
          formData={patientData}
          setFormData={setPatientData}
          onSave={handleSave}
        />
      )
      }
    </ >
  );
};

export default UserMain;