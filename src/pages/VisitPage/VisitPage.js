import React, { useState } from "react";
import PatientVisit from "@/components/PatientVisit";
import { defaultPatients } from "@/mock/patients";
import { useLocalStorage } from "@/utils/helpers";
import { motion } from "framer-motion";
import { STYLE_ROOT } from "@/styles/styleGeneric";

const VisitPage = ({ patientStorage }) => {
  const [patients, setPatients] = useLocalStorage("patients", defaultPatients);

  const handleSaveVisit = (visitData) => {
    // Buscar paciente o crear nuevo
    let updatedPatients = [...patients];
    const existingPatient = updatedPatients.find(
      (p) => p.name.toLowerCase() === visitData.patientName.toLowerCase()
    );
    if (existingPatient) {
      existingPatient.visits.push({
        id: Date.now().toString(),
        ...visitData,
        teethMarks: visitData.teethMarks,
      });
    } else {
      updatedPatients.push({
        id: Date.now().toString(),
        name: visitData.patientName,
        visits: [
          {
            id: Date.now().toString() + "_v",
            ...visitData,
            teethMarks: visitData.teethMarks,
          },
        ],
      });
    }
    setPatients(updatedPatients);
    alert("¡Visita guardada! Dale una sonrisa al paciente. 😁");
  };

  return (
    <div className="h-full w-full font-sans flex flex-col overflow-hidden">
      <div className="flex flex-col h-full overflow-hidden">
        <div className={`mb-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-2 md:px-12 shadow-sm border border-slate-100 flex-shrink-0 ${STYLE_ROOT.roundedPanelMain}`}>
          <div className=''>
            <h1 className="text-3xl font-black text-[#052a3d] tracking-tight">
              Nueva Visita Médica
            </h1>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200">
          </div>
        </div>
        <motion.div className={`bg-white shadow-sm border border-slate-100 flex flex-col flex-1 overflow-hidden ${STYLE_ROOT.roundedPanelMain}`}>
          <div className="flex-1 overflow-y-auto p-8 md:px-12 custom-scrollbar">
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className=" md:max-w-6xl lg:w-7xl mx-auto"
            > */}

            <PatientVisit onSaveVisit={handleSaveVisit} />
            {/* </motion.div> */}
          </div>
        </motion.div>
      </div>
    </div>




  );
};

export default VisitPage;
