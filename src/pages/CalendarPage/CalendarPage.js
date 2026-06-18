import React, { useEffect, useState } from 'react';
import CalendarView from '@/components/Calendar/Calendar';
import { PatientLayout } from '@/components/Layout/PatientLayout';
import ButtonGeneric from '@/components/Common/Button/ButtonGeneric';
import { calendarService } from '@/services/calendar/CalendarService';
import GenericModal from '@/components/Common/Modal/GenericModal';
import { showToast } from '@/utils/showToast';

const CalendarPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Formulario para nueva cita
  const [newAppt, setNewAppt] = useState({
    patientId: '',
    date: '',
    time: '09:00',
    description: ''
  });

  const loadData = async () => {
    const appts = await calendarService.getAllAppointments();
    setAppointments(appts);
    const data = await calendarService.getPatients();
    setPatients(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenModal = (preselectedDate = null) => {
    setIsModalOpen(true);
    
    // Si se pasa una fecha (ej. al hacer click en el calendario), la preseleccionamos
    const initialDate = preselectedDate || new Date().toISOString().split('T')[0];
    
    setNewAppt({
      patientId: '',
      date: initialDate,
      time: '09:00',
      description: ''
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveAppointment = async () => {
    if (!newAppt.patientId || !newAppt.date || !newAppt.time || !newAppt.description) {
      showToast("Campos Incompletos", "Por favor completa todos los campos de la cita.", "error");
      return;
    }

    // Unir fecha y hora para el formato completo
    const apptDateStr = `${newAppt.date}T${newAppt.time}:00`;
    
    const success = await calendarService.saveAppointment({
      patientId: newAppt.patientId,
      date: apptDateStr,
      description: newAppt.description
    });

    if (success) {
      showToast("Cita Agendada", "¡La cita ha sido registrada con éxito! 🦷", "success");
      loadData();
      setIsModalOpen(false);
    } else {
      showToast("Error", "Hubo un problema al guardar la cita.", "error");
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas cancelar esta cita?")) {
      const success = await calendarService.deleteAppointment(id);
      if (success) {
        showToast("Cita Cancelada", "La cita ha sido eliminada.", "success");
        loadData();
      } else {
        showToast("Error", "No se pudo cancelar la cita.", "error");
      }
    }
  };

  return (
    <>
      <PatientLayout
        header={
          <>
            <div>
              <h1 className="text-3xl font-black text-[#052a3d] tracking-tight">
                Calendario de Citas
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Organiza tu agenda de consultas y tratamientos</p>
            </div>
            <div>
              <ButtonGeneric
                variant="primary"
                onClick={() => handleOpenModal(null)}
                className="px-6 py-2.5 font-bold shadow-md shadow-blue-100 flex items-center gap-2 hover:scale-[1.02] transition-all"
              >
                Solicitar Cita
              </ButtonGeneric>
            </div>
          </>
        }
        content={
          <CalendarView
            appointments={appointments}
            patients={patients}
            onDeleteAppointment={handleDeleteAppointment}
            onAddAppointmentClick={handleOpenModal}
          />
        }
      />

      {/* Modal para agendar cita */}
      <GenericModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveAppointment}
        title="Agendar Nueva Cita"
        saveText="Agendar Cita"
      >
        <div className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700">Paciente</label>
            <select
              value={newAppt.patientId}
              onChange={(e) => setNewAppt(prev => ({ ...prev, patientId: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm text-slate-700 shadow-sm"
            >
              <option value="">Seleccionar Paciente</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Fecha</label>
              <input
                type="date"
                value={newAppt.date}
                onChange={(e) => setNewAppt(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm text-slate-700 shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Hora</label>
              <input
                type="time"
                value={newAppt.time}
                onChange={(e) => setNewAppt(prev => ({ ...prev, time: e.target.value }))}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm text-slate-700 shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700">Descripción / Motivo</label>
            <input
              type="text"
              value={newAppt.description}
              onChange={(e) => setNewAppt(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Ej. Limpieza, consulta general, ortodoncia..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm text-slate-700 shadow-sm"
            />
          </div>
        </div>
      </GenericModal>
    </>
  );
};

export default CalendarPage;