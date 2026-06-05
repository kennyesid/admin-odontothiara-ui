import React from "react";

// Asumo que tienes este objeto de configuración de estilos en tu proyecto
const STYLE_ROOT = {
  roundedPanelMain: "rounded-3xl", // O el valor que tengas asignado en tus constantes
};

export const PatientLayout = ({ header, content }) => {
  return (
    <div className="h-full w-full font-sans flex flex-col overflow-hidden">
      <div className="flex flex-col h-full overflow-hidden">
        
        {/* PRIMER PADRE: Header / Cabecera */}
        <div 
          className={`mb-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-2 md:px-12 shadow-sm border border-slate-100 flex-shrink-0 ${STYLE_ROOT.roundedPanelMain}`}
        >
          {header}
        </div>

        {/* SEGUNDO PADRE: Contenedor Principal de Contenido */}
        <div 
          className={`bg-white shadow-sm border border-slate-100 flex flex-col flex-1 overflow-hidden ${STYLE_ROOT.roundedPanelMain}`}
        >
          <div className="flex-1 overflow-y-auto p-8 md:px-12 custom-scrollbar">
            {content}
          </div>
        </div>

      </div>
    </div>
  );
};