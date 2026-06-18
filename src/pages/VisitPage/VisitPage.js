import React from "react";
import PatientVisit from "@/components/PatientVisit";
import { motion } from "framer-motion";
import { STYLE_ROOT } from "@/styles/styleGeneric";
import { visitService } from "@/services/visit/VisitService";
import { showToast } from "@/utils/showToast";

const VisitPage = () => {
  const handleSaveVisit = async (visitData) => {
    const success = await visitService.saveVisit(visitData);
    if (success) {
      showToast("Registro Exitoso", "¡Visita médica guardada con éxito! 😁", "success");
    } else {
      showToast("Error", "No se pudo guardar la visita médica.", "error");
    }
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
            <PatientVisit onSaveVisit={handleSaveVisit} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VisitPage;
