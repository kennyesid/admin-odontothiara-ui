import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, FileText, Save } from "lucide-react";
import DentalChart from "./DentalChart/DentalChart";

const PatientVisit = ({ onSaveVisit }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    date: new Date().toISOString().slice(0, 16),
    preObservations: "",
    postObservations: "",
    teethMarks: {},
  });

  const handleMarkTooth = (toothNum, marks) => {
    setFormData((prev) => ({
      ...prev,
      teethMarks: { ...prev.teethMarks, [toothNum]: marks },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveVisit(formData);
    setFormData({
      patientName: "",
      date: new Date().toISOString().slice(0, 16),
      preObservations: "",
      postObservations: "",
      teethMarks: {},
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl space-y-4 sm:space-y-6 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4 flex-shrink-0" /> Nombre del Paciente
          </label>
          <input
            type="text"
            value={formData.patientName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, patientName: e.target.value }))
            }
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4 flex-shrink-0" /> Fecha y Hora
          </label>
          <input
            type="datetime-local"
            value={formData.date}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, date: e.target.value }))
            }
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium flex items-center gap-2">
          <FileText className="w-4 h-4 flex-shrink-0" /> Observaciones Antes
        </label>
        <textarea
          value={formData.preObservations}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              preObservations: e.target.value,
            }))
          }
          rows={3}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base resize-none"
          placeholder="Describe el estado inicial del paciente..."
        />
      </div>

      <DentalChart
        onMarkTooth={handleMarkTooth}
        markedTeeth={formData.teethMarks}
      />

      {/* <div className="space-y-2">  
        <label className="block text-sm font-medium flex items-center gap-2">  
          <FileText className="w-4 h-4 flex-shrink-0" /> Observaciones Después  
        </label>  
        <textarea  
          value={formData.postObservations}  
          onChange={(e) => setFormData(prev => ({ ...prev, postObservations: e.target.value }))}  
          rows={3}  
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base resize-none"  
          placeholder="Notas post-tratamiento..."  
        />  
      </div>   */}

      <motion.button
        type="submit"
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl sm:rounded-2xl font-semibold flex items-center justify-center gap-2 text-base"
        whileHover={{ scale: 1.02 }}
      >
        <Save className="w-5 h-5" /> Guardar Visita
      </motion.button>
    </motion.form>
  );
};

export default PatientVisit;
