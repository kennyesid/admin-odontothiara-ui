import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Clock, 
  Eye, 
  Search, 
  Stethoscope, 
  Trash2, 
  CalendarPlus, 
  ChevronLeft, 
  ChevronRight,
  User
} from 'lucide-react';

const CalendarView = ({ appointments, patients, onDeleteAppointment, onAddAppointmentClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('appointments'); // 'appointments' o 'visits'
  const [searchQuery, setSearchQuery] = useState('');

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const getSelectedDay = () => selectedDate ? new Date(selectedDate + 'T00:00:00').getDate() : null;

  const getPatientName = (patientId) => {
    const patient = patients.find(p => String(p.id) === String(patientId));
    if (!patient) return 'Paciente desconocido';
    return patient.name || `${patient.Name || ''} ${patient.FirstSurname || ''}`.trim();
  };

  const getPatientImage = (patientId) => {
    const patient = patients.find(p => String(p.id) === String(patientId));
    return patient ? patient.Image : null;
  };

  const formatEventTime = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true });
    } catch (e) {
      return '';
    }
  };

  // Filtrar eventos según la vista seleccionada, mes y búsqueda
  const getMonthEvents = () => {
    if (viewMode === 'appointments') {
      return appointments.filter(appt => {
        const apptDate = new Date(appt.date);
        const matchesMonth = apptDate.getMonth() === currentMonth && apptDate.getFullYear() === currentYear;
        
        // Buscar por nombre del paciente
        const patientName = getPatientName(appt.patientId).toLowerCase();
        const matchesSearch = !searchQuery || patientName.includes(searchQuery.toLowerCase());
        
        return matchesMonth && matchesSearch;
      }).sort((a, b) => new Date(a.date) - new Date(b.date));
    } else { // visits
      const allVisits = [];
      patients.forEach(patient => {
        if (patient.visits && Array.isArray(patient.visits)) {
          patient.visits.forEach(visit => {
            const visitDate = new Date(visit.date);
            const matchesMonth = visitDate.getMonth() === currentMonth && visitDate.getFullYear() === currentYear;
            
            const patientName = (patient.name || `${patient.Name || ''} ${patient.FirstSurname || ''}`).trim().toLowerCase();
            const matchesSearch = !searchQuery || patientName.includes(searchQuery.toLowerCase());
            
            if (matchesMonth && matchesSearch) {
              allVisits.push({ 
                ...visit, 
                patientName: patient.name || `${patient.Name || ''} ${patient.FirstSurname || ''}`.trim(), 
                patientId: patient.id 
              });
            }
          });
        }
      });
      return allVisits.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
  };

  const monthEvents = getMonthEvents();
  
  // Eventos del día seleccionado (o todos los del mes si no hay día seleccionado)
  const dayEvents = selectedDate ? monthEvents.filter(event => {
    const eventDay = new Date(event.date).getDate();
    return eventDay === getSelectedDay();
  }) : monthEvents;

  const handleDateClick = (day) => {
    const clickDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    setSelectedDate(clickDate);
  };

  const handleClearSelection = () => {
    setSelectedDate(null);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
    setSelectedDate(null);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* Controles superiores (Filtros y Búsqueda) */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100 shadow-sm flex-shrink-0">
        
        {/* Selector de Vista (Citas vs Visitas) */}
        <div className="flex bg-slate-200/60 p-1.5 rounded-2xl w-full lg:w-auto">
          <button
            onClick={() => { setViewMode('appointments'); setSelectedDate(null); setSearchQuery(''); }}
            className={`flex-1 lg:flex-none px-5 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
              viewMode === 'appointments' 
                ? 'bg-[#052a3d] text-white shadow-md' 
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" /> Citas
          </button>
          <button
            onClick={() => { setViewMode('visits'); setSelectedDate(null); setSearchQuery(''); }}
            className={`flex-1 lg:flex-none px-5 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
              viewMode === 'visits' 
                ? 'bg-[#117192] text-white shadow-md' 
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <Stethoscope className="w-4 h-4" /> Visitas
          </button>
        </div>

        {/* Buscador de Paciente */}
        <div className="relative w-full lg:max-w-md">
          <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Buscar paciente en ${viewMode === 'appointments' ? 'citas' : 'visitas'}...`}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm text-slate-700 shadow-sm"
          />
        </div>
      </div>

      {/* Contenedor Principal (Grid del Calendario + Lista de Eventos) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LADO IZQUIERDO: Calendario (Columnas 1 a 7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-5 shadow-xl shadow-slate-200/20">
          
          {/* Header del Calendario (Navegación de Meses) */}
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-lg font-black text-[#052a3d] uppercase tracking-wide flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-[#117192]" />
              {new Date(currentYear, currentMonth).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={handlePrevMonth} 
                className="p-2 hover:bg-slate-100 active:scale-95 border border-slate-200 rounded-xl transition-all text-slate-600 hover:text-[#052a3d]"
                title="Mes Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNextMonth} 
                className="p-2 hover:bg-slate-100 active:scale-95 border border-slate-200 rounded-xl transition-all text-slate-600 hover:text-[#052a3d]"
                title="Siguiente Mes"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Días de la Semana */}
          <div className="grid grid-cols-7 gap-1.5 text-center mb-2">
            {['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'].map((day, idx) => (
              <div 
                key={day} 
                className={`text-xs font-black tracking-wider uppercase py-2 rounded-xl ${
                  idx === 0 || idx === 6 ? 'text-rose-500 bg-rose-50/50' : 'text-[#052a3d]/80 bg-slate-50'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Grid de los Días del Mes */}
          <div className="grid grid-cols-7 gap-1.5">
            {/* Celdas vacías para el desfase del primer día */}
            {Array.from({ length: firstDay }, (_, idx) => (
              <div key={`empty-${idx}`} className="aspect-square p-2" />
            ))}
            
            {/* Días del mes */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const cellDateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
              
              // Contar eventos del día
              const dayEventsCount = monthEvents.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.getDate() === day && eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
              }).length;

              const isSelected = selectedDate === cellDateStr;
              const isToday = new Date().toDateString() === new Date(currentYear, currentMonth, day).toDateString();
              
              // Colores de eventos
              const dotColor = viewMode === 'appointments' ? 'bg-[#117192]' : 'bg-emerald-500';

              return (
                <motion.div
                  key={day}
                  className={`aspect-square p-1.5 flex flex-col items-center justify-between cursor-pointer rounded-2xl relative border transition-all ${
                    isSelected 
                      ? 'bg-[#052a3d] border-[#052a3d] text-white shadow-lg font-bold scale-[1.03] shadow-blue-900/10' 
                      : isToday
                        ? 'bg-[#bde0eeff]/50 border-[#117192] text-[#052a3d] font-bold'
                        : 'bg-slate-50/50 hover:bg-slate-100/80 border-slate-100 text-slate-700 hover:scale-[1.02]'
                  }`}
                  onClick={() => handleDateClick(day)}
                  whileTap={{ scale: 0.96 }}
                >
                  <span className="text-sm font-semibold self-start ml-0.5 mt-0.5">{day}</span>
                  
                  {/* Indicador de eventos */}
                  {dayEventsCount > 0 && (
                    <div className="flex items-center gap-1 mt-auto">
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : dotColor} animate-pulse`} />
                      <span className={`text-[10px] font-black ${isSelected ? 'text-sky-200' : 'text-slate-500'}`}>
                        {dayEventsCount}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* LADO DERECHO: Eventos/Detalles (Columnas 8 a 12) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-100 p-5 shadow-xl shadow-slate-200/20 flex flex-col self-stretch max-h-[500px]">
          
          {/* Header de la sección de eventos */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h3 className="text-md font-black text-[#052a3d] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#117192]" />
              {selectedDate 
                ? `Citas del ${new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}` 
                : `${viewMode === 'appointments' ? 'Citas' : 'Visitas'} del Mes`
              }
              <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full font-bold">
                {dayEvents.length}
              </span>
            </h3>
            
            {selectedDate && (
              <button
                onClick={handleClearSelection}
                className="text-xs text-[#117192] hover:text-[#052a3d] font-bold flex items-center gap-1 transition-colors"
                title="Ver todas las citas del mes"
              >
                <Eye className="w-4 h-4" /> Ver Todo
              </button>
            )}
          </div>

          {/* Contenido / Lista de Eventos */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {dayEvents.length > 0 ? (
                dayEvents.map(event => {
                  const patientImg = getPatientImage(event.patientId);
                  
                  return (
                    <motion.div
                      key={event.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="p-4 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start gap-3 group relative"
                    >
                      {/* Imagen/Inicial del Paciente */}
                      <div className="w-10 h-10 rounded-xl bg-white overflow-hidden border border-slate-200 flex-shrink-0 flex items-center justify-center">
                        {patientImg ? (
                          <img src={patientImg} className="w-full h-full object-cover" alt="Profile" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#117192] uppercase font-bold text-xs bg-sky-50">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      {/* Detalles del Evento */}
                      <div className="flex-1 min-w-0 pr-6">
                        <span className="font-bold text-slate-800 text-sm block truncate">
                          {viewMode === 'appointments' ? getPatientName(event.patientId) : event.patientName}
                        </span>
                        
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-[#117192]" />
                          <span>
                            {new Date(event.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} a las {formatEventTime(event.date)}
                          </span>
                        </div>

                        {viewMode === 'appointments' ? (
                          <span className="text-slate-600 text-xs mt-2 block bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                            {event.description}
                          </span>
                        ) : (
                          <div className="text-slate-600 text-xs mt-2 space-y-1 bg-white p-2.5 rounded-lg border border-slate-100">
                            {event.preObservations && (
                              <p><strong className="text-[#052a3d]/80">Pre-Obs:</strong> {event.preObservations}</p>
                            )}
                            {event.postObservations && (
                              <p><strong className="text-[#052a3d]/80">Post-Obs:</strong> {event.postObservations}</p>
                            )}
                            {event.teethMarks && Object.keys(event.teethMarks).length > 0 && (
                              <p><strong className="text-[#052a3d]/80">Dientes:</strong> {Object.keys(event.teethMarks).join(', ')}</p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Botón de Acción (Eliminar Cita) - Solo en modo appointments */}
                      {viewMode === 'appointments' && onDeleteAppointment && (
                        <button
                          onClick={() => onDeleteAppointment(event.id)}
                          className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
                          title="Cancelar Cita"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </motion.div>
                  );
                })
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="flex flex-col items-center justify-center text-center py-12 px-4 h-full"
                >
                  <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-300 mb-3">
                    <CalendarIcon className="w-7 h-7" />
                  </div>
                  <p className="text-sm font-bold text-slate-700">Sin eventos agendados</p>
                  <p className="text-xs text-slate-400 max-w-[200px] mt-1">
                    {selectedDate 
                      ? 'No hay eventos planificados para el día seleccionado.' 
                      : `No hay eventos registrados en este mes.`
                    }
                  </p>
                  
                  {viewMode === 'appointments' && selectedDate && onAddAppointmentClick && (
                    <button
                      onClick={() => onAddAppointmentClick(selectedDate)}
                      className="mt-4 px-4 py-2 bg-[#117192] hover:bg-[#052a3d] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" /> Agendar para hoy
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CalendarView;