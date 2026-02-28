import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, FileText, Save } from "lucide-react";
import DentalChart from "./DentalChart/DentalChart";
import ButtonGeneric from "./Common/Button/ButtonGeneric";
import { userService } from "@/services/user/UserService";

const now = new Date();
const offset = now.getTimezoneOffset() * 60000;
const localISOTime = new Date(now - offset).toISOString().slice(0, 16);

const PatientVisit = ({ onSaveVisit }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    // date: new Date().toISOString().slice(0, 16),
    date: localISOTime,
    preObservations: "",
    postObservations: "",
    teethMarks: {},
  });
  const [patients, setPatients] = useState([]);

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
      date: localISOTime,
      preObservations: "",
      postObservations: "",
      teethMarks: {},
    });
  };

  const handleChange = (field, value) => {
    if (typeof setFormData === 'function') {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const formatToLocalDatetime = (dateValue) => {
    if (!dateValue) return '';
    try {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return '';

      const offset = date.getTimezoneOffset() * 60000;
      const localISOTime = new Date(date.getTime() - offset).toISOString().slice(0, 16);
      return localISOTime;
    } catch (e) {
      return '';
    }
  };

  const labelStyle = "block text-xs font-semibold text-slate-500  tracking-wider mb-1 ml-1";
  const inputStyle = `w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 placeholder:text-slate-400`;
  const cardStyle = "p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow";

  useEffect(() => {
    const data = userService.getAllPatients();
    setPatients(data);
  }, []);

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className={labelStyle}>
            Nombre del Paciente
          </label>
          <select
            value={formData?.patientName || ''}
            onChange={(e) => handleChange('patientName', e.target.value)}
            // pl-10 para dejar espacio al icono de la izquierda
            // appearance-none para quitar la flecha por defecto del sistema
            className={`${inputStyle} pl-10 appearance-none cursor-pointer`}
            required
          >
            <option value="" disabled>Seleccione un paciente</option>
            {patients.length > 0 ? (
              patients.map((patient, index) => (
                <option key={patient.id || index} value={patient.name}>
                  {patient.name}
                </option>
              ))
            ) : (
              <option value="" disabled>No hay pacientes registrados</option>
            )}
          </select>
          {/* <div className="relative">
            <User className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="text"
              value={formData?.patientName || ''}
              onChange={(e) => handleChange('patientName', e.target.value)}
              placeholder="Juan Pérez"
              className={inputStyle + " pl-10 "}
              required
            />
          </div> */}
        </div>

        <div className="space-y-2">
          <label className={labelStyle}>
            Fecha y Hora
          </label>
          <div className="relative">
            <input
              type="datetime-local"
              value={formData?.date || ''}
              onChange={(e) => handleChange('date', e.target.value)}
              className={inputStyle}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-2">
        <label className={labelStyle}>
          Observaciones Antes
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 text-slate-400" size={18} />
          <textarea
            value={formData?.preObservations || ''}
            onChange={(e) => handleChange('preObservations', e.target.value)}
            rows={4}
            placeholder="Describe detalladamente el estado inicial o motivo de la consulta..."
            className={inputStyle + " pl-10 "}
          />
        </div>
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

      <ButtonGeneric
        variant="primary"
        className=" mt-4 "
      >
        <Save className="w-5 h-5" /> Guardar Visita
      </ButtonGeneric>

      {/* <motion.button
        type="submit"
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white mt-4 py-3 rounded-xl sm:rounded-2xl font-semibold flex items-center justify-center gap-2 text-base"
        whileHover={{ scale: 1.02 }}
      >
        <Save className="w-5 h-5" /> Guardar Visita
      </motion.button> */}
    </motion.form >
  );
};

export default PatientVisit;
