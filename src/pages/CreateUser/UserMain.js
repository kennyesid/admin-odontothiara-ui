import React, { useEffect, useState } from 'react';
import { UserPlus, X, Save, ClipboardList, User, Heart, Baby } from 'lucide-react';
import GenericModal from '@/components/Common/Modal/GenericModal';
import PatientForm from './PatientForm';
import GenericModalWithControl from '@/components/Common/Modal/GenericModalWithControl';
import { userService } from '@/services/user/UserService';
import { showToast } from '@/utils/showToast';
import UserForm from './UserForm';
import { cutImageAndSetBase64 } from '@/utils/imageUtil';
import UserTable from './UserTable';

/**
 * COMPONENTE: PatientForm
 * Formulario que recibe estado del padre (Controlled Component)
 */

/**
 * COMPONENTE: UserMain
 */
const UserMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [levelSection, setLevelSection] = useState(1);
  const [view, setView] = useState("userIndex");
  const [patients, setPatients] = useState([]);
  const [patientData, setPatientData] = useState({
    Id: 0,
    RolId: 2,
    Name: '',
    FirstSurname: '',
    SecondSurname: '',
    Image: '',
    Age: 0,
    Sexo: 'Masculino',
    BirthDate: new Date().toISOString().split('T')[0],
    PlaceOfBirth: '',
    Occupation: '',
    MaritalStatus: 'S/N',
    Address: '',
    IdentityCard: '',
    Email: '',
    Phone: '',

    // QuestionPersonal
    personalQuestions: {
      Smokes: false,
      SmokingYears: 0,
      DrinksAlcohol: false,
      AlcoholDescription: '',
      Bruxism: false,
      BruxismDescription: '',
      ChewsCoca: false,
      CocaDescription: '',
      State: true
    },

    // QuestionPathological
    pathologicalQuestions: {
      Anemia: false,
      Diabetes: false,
      HeartDisease: false,
      Allergies: false,
      AllergiesDescription: '',
      TakingMedication: false,
      Hypertension: false,
      OtherConditions: ''
    },

    // QuestionWomen
    womenQuestions: {
      IsPregnant: false,
      PregnancyTimeMonth: 0,
      LastMenstruationDate: new Date().toISOString().split('T')[0],
      State: true
    }
  });


  const handleSave = async () => {
    const responseUserService = userService.savePatient(patientData);
    const message = `Guardando paciente:`;

    if (responseUserService) {
      showToast(
        "Registro Exitoso",
        `El paciente ha sido guardado en el historial local.`,
        "success"
      );
    }

    setView("userIndex");
  };

  const handleNewUser = () => {
    // setPatientData(restarUser());
    setLevelSection(1);
    const asdasd = patientData;
    setView("userForm");
  };

  const handleSubmitAlternativeIncrement = () => {
    setLevelSection(prev => prev + 1);
  };

  const handleSubmitAlternativeDecrement = () => {
    setLevelSection(prev => prev - 1);
  };

  const handleTestToast = () => {
    showToast(
      "Test Toast",
      "This is a test toast message.",
      "success"
    );
  };

  useEffect(() => {
    setPatients(userService.getAllPatients());
  }, []);

  return (
    <div className="h-full w-full font-sans flex flex-col overflow-hidden">
      {view === "userIndex" ? (
        <div className="flex flex-col h-full overflow-hidden">
          <div className="mb-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-2 md:px-12 rounded-3xl shadow-sm border border-slate-100 flex-shrink-0">
            <div>
              <h1 className="text-3xl font-black text-[#052a3d] tracking-tight">
                Pacientes
              </h1>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200">
            </div>
          </div>
          {/* <button
            onClick={handleNewUser}
            className="w-full bg
            
            -white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-xl hover:-translate-y-1 transition-all group"
          >
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <UserPlus size={28} />
            </div>
            <div className="text-left">
              <h3 className="font-black text-slate-800 text-xl">Nuevo Registro</h3>
              <p className="text-slate-400 text-sm">Abrir formulario de admisión</p>
            </div>
          </button> */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-8 md:px-12 custom-scrollbar">
              <UserTable
                patients={patients}
                onAddNew={() => setView("userForm")}
              />
            </div>
          </div>

          {/* <button
            onClick={() => handleTestToast()}
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-800 font-black rounded-3xl shadow-xl hover:shadow-cyan-100 hover:-translate-y-1 transition-all border-2 border-transparent hover:border-cyan-500"
          >
            <div className="p-2 bg-cyan-100 text-cyan-600 rounded-xl group-hover:bg-cyan-600 group-hover:text-white transition-colors">
              <UserPlus size={24} />
            </div>
            PRUEBA TOAST
          </button> */}
        </div>
      ) : (
        <UserForm
          formData={patientData}
          setFormData={setPatientData}
          onSave={handleSave}
        />
      )
      }
    </div >
    // <div className="min-h-screen p-8 flex flex-col items-center justify-center">
    //   <div className="text-center space-y-6">
    //     <h1 className="text-5xl font-black text-slate-800 tracking-tight">
    //       Gestión de <span className="text-cyan-600">Pacientes</span>
    //     </h1>
    //     <p className="text-slate-500 max-w-md mx-auto">
    //       Utilice el botón de abajo para registrar un nuevo ingreso al sistema hospitalario.
    //     </p>

    //     <button
    //       onClick={() => setIsModalOpen(true)}
    //       className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-800 font-black rounded-3xl shadow-xl hover:shadow-cyan-100 hover:-translate-y-1 transition-all border-2 border-transparent hover:border-cyan-500"
    //     >
    //       <div className="p-2 bg-cyan-100 text-cyan-600 rounded-xl group-hover:bg-cyan-600 group-hover:text-white transition-colors">
    //         <UserPlus size={24} />
    //       </div>
    //       Nuevo Usuario
    //     </button>
    //     <button
    //       onClick={() => handleTestToast()}
    //       className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-800 font-black rounded-3xl shadow-xl hover:shadow-cyan-100 hover:-translate-y-1 transition-all border-2 border-transparent hover:border-cyan-500"
    //     >
    //       <div className="p-2 bg-cyan-100 text-cyan-600 rounded-xl group-hover:bg-cyan-600 group-hover:text-white transition-colors">
    //         <UserPlus size={24} />
    //       </div>
    //       PRUEBA TOAST
    //     </button>
    //   </div>

    //   <GenericModalWithControl
    //     isOpen={isModalOpen}
    //     onClose={() => setIsModalOpen(false)}
    //     onSave={handleSave}
    //     onSubmitAlternativeIncrement={handleSubmitAlternativeIncrement}
    //     onSubmitAlternativeDecrement={handleSubmitAlternativeDecrement}
    //     title="Registro de Nuevo Paciente"
    //     saveText="Finalizar Registro"
    //     footerActive={levelSection}
    //   >
    //     <PatientForm
    //       formData={patientData}
    //       setFormData={setPatientData}
    //       paramLevelSection={levelSection}
    //     />
    //   </GenericModalWithControl>
    // </div>
  );
};

export default UserMain;