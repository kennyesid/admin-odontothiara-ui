import React, { useState } from 'react';  
import { motion } from 'framer-motion';  
import { Calendar, Plus, Clock, Eye, Search, Stethoscope } from 'lucide-react';  

const CalendarView = ({ appointments, patients, addAppointment }) => {  
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());  
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());  
  const [selectedDate, setSelectedDate] = useState(null);  
  const [viewMode, setViewMode] = useState('appointments'); // 'appointments' o 'visits'  
  const [searchQuery, setSearchQuery] = useState('');  
  const [newAppt, setNewAppt] = useState({ patientId: '', time: '', description: '' });  

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();  
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();  

  const getSelectedDay = () => selectedDate ? new Date(selectedDate + 'T00:00:00').getDate() : null;  

  // Filtrar eventos según vista, mes y búsqueda  
  const getMonthEvents = () => {  
    if (viewMode === 'appointments') {  
      return appointments.filter(appt => {  
        const apptDate = new Date(appt.date);  
        const matchesMonth = apptDate.getMonth() === currentMonth && apptDate.getFullYear() === currentYear;  
        const matchesSearch = !searchQuery || patients.find(p => p.id === appt.patientId)?.name.toLowerCase().includes(searchQuery.toLowerCase());  
        return matchesMonth && matchesSearch;  
      }).sort((a, b) => new Date(a.date) - new Date(b.date));  
    } else { // visits  
      const allVisits = [];  
      patients.forEach(patient => {  
        patient.visits.forEach(visit => {  
          const visitDate = new Date(visit.date);  
          const matchesMonth = visitDate.getMonth() === currentMonth && visitDate.getFullYear() === currentYear;  
          const matchesSearch = !searchQuery || patient.name.toLowerCase().includes(searchQuery.toLowerCase());  
          if (matchesMonth && matchesSearch) {  
            allVisits.push({ ...visit, patientName: patient.name, patientId: patient.id });  
          }  
        });  
      });  
      return allVisits.sort((a, b) => new Date(a.date) - new Date(b.date));  
    }  
  };  

  const monthEvents = getMonthEvents();  
  const dayEvents = selectedDate ? monthEvents.filter(event => {  
    const eventDay = new Date(event.date).getDate();  
    return eventDay === getSelectedDay();  
  }) : monthEvents;  

  const handleDateClick = (day) => {  
    const clickDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;  
    setSelectedDate(clickDate);  
    setNewAppt({ patientId: '', time: '', description: '' });  
  };  

  const handleClearSelection = () => {  
    setSelectedDate(null);  
    setNewAppt({ patientId: '', time: '', description: '' });  
  };  

  const handleAddAppt = () => {  
    if (newAppt.patientId && newAppt.time && newAppt.description && viewMode === 'appointments') {  
      addAppointment({ ...newAppt, date: new Date(`${selectedDate}T${newAppt.time}`) });  
      setNewAppt({ patientId: '', time: '', description: '' });  
    }  
  };  

  const getPatientName = (patientId) => {  
    const patient = patients.find(p => p.id === patientId);  
    return patient ? patient.name : 'Paciente desconocido';  
  };  

  return (  
    <motion.div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl space-y-6 w-full"  
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}>  
      <div className="text-center space-y-4">  
        <h3 className="text-lg sm:text-xl font-bold flex items-center justify-center gap-2 mx-auto">  
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6" /> Calendario - {new Date(currentYear, currentMonth).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}  
        </h3>  
        <div className="flex justify-center gap-2">  
          <button onClick={() => setCurrentMonth(prev => (prev - 1 + 12) % 12)} className="px-3 py-2 bg-gray-200 rounded text-sm">‹</button>  
          <button onClick={() => setCurrentMonth(prev => (prev + 1) % 12)} className="px-3 py-2 bg-gray-200 rounded text-sm">›</button>  
        </div>  

        {/* Botones de vista */}  
        <div className="flex justify-center gap-2">  
          <motion.button  
            onClick={() => { setViewMode('appointments'); setSelectedDate(null); setSearchQuery(''); }}  
            className={`px-4 py-2 rounded text-sm font-medium flex items-center gap-1 ${  
              viewMode === 'appointments' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'  
            }`}  
            whileHover={{ scale: 1.05 }}  
          >  
            <Clock className="w-4 h-4" /> Citas  
          </motion.button>  
          <motion.button  
            onClick={() => { setViewMode('visits'); setSelectedDate(null); setSearchQuery(''); }}  
            className={`px-4 py-2 rounded text-sm font-medium flex items-center gap-1 ${  
              viewMode === 'visits' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'  
            }`}  
            whileHover={{ scale: 1.05 }}  
          >  
            <Stethoscope className="w-4 h-4" /> Visitas  
          </motion.button>  
        </div>  

        {/* Buscador */}  
        <div className="flex justify-center">  
          <div className="relative w-full max-w-md">  
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />  
            <input  
              type="text"  
              value={searchQuery}  
              onChange={(e) => setSearchQuery(e.target.value)}  
              placeholder={`Buscar por paciente en ${viewMode === 'appointments' ? 'citas' : 'visitas'}`}  
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"  
            />  
          </div>  
        </div>  
      </div>  

      {/* Lista de eventos dinámica */}  
      <div className="space-y-4">  
        <div className="flex items-center justify-between">  
          <h4 className="text-lg font-bold flex items-center gap-2">  
            <Clock className="w-5 h-5" /> {selectedDate ? `Eventos del ${new Date(selectedDate).toLocaleDateString('es-ES')}` : `${viewMode === 'appointments' ? 'Citas' : 'Visitas'} del Mes`} ({dayEvents.length})  
          </h4>  
          {selectedDate && (  
            <motion.button  
              onClick={handleClearSelection}  
              className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded text-sm font-medium"  
              whileHover={{ scale: 1.05 }}  
            >  
              <Eye className="w-4 h-4" /> Ver Todo  
            </motion.button>  
          )}  
        </div>  
        {dayEvents.length > 0 ? (  
          <ul className="space-y-3 max-h-48 overflow-y-auto border border-gray-200 rounded-xl p-3 bg-gray-50">  
            {dayEvents.map(event => (  
              <li key={event.id} className="p-3 bg-white rounded-lg shadow-sm">  
                <div className="flex justify-between items-start gap-4">  
                  <div className="flex-1">  
                    <span className="font-semibold text-gray-900 block">{viewMode === 'appointments' ? getPatientName(event.patientId) : event.patientName}</span>  
                    <span className="text-gray-600 block">{new Date(event.date).toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>  
                    {viewMode === 'appointments' ? (  
                      <span className="text-gray-500 text-xs block">{event.description}</span>  
                    ) : (  
                      <div className="text-gray-500 text-xs mt-1">  
                        <span>Antes: {event.preObservations || 'N/A'}</span><br />  
                        <span>Después: {event.postObservations || 'N/A'}</span><br />  
                        <span>Puntos: {Object.keys(event.teethMarks || {}).join(', ') || 'Ninguno'}</span>  
                      </div>  
                    )}  
                  </div>  
                  <Clock className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />  
                </div>  
              </li>  
            ))}  
          </ul>  
        ) : (  
          <p className="text-gray-500 text-center py-8 text-sm">{selectedDate ? `No hay ${viewMode === 'appointments' ? 'citas' : 'visitas'} para el ${new Date(selectedDate).toLocaleDateString('es-ES')}` : `No hay ${viewMode === 'appointments' ? 'citas' : 'visitas'} este mes. ${viewMode === 'appointments' ? '¡Agenda una!' : '¡Registra una!'}`}</p>  
        )}  
      </div>  

      {/* Calendario grid */}  
      <div className="grid grid-cols-2 sm:grid-cols-7 gap-1 sm:gap-2 mb-4">  
        {['D', 'L', 'M', 'X', 'J', 'V', 'S'].map(day => (  
          <div key={day} className="text-center font-semibold py-2 px-1 sm:py-2 bg-blue-100 rounded text-xs sm:text-sm">{day}</div>  
        ))}  
        {Array.from({ length: firstDay }, () => <div key={`empty-${Math.random()}`} className="p-1 sm:p-2" />)}  
        {Array.from({ length: daysInMonth }, (_, i) => {  
          const day = i + 1;  
          const dayEventCount = monthEvents.filter(event => new Date(event.date).getDate() === day).length;  
          const isSelected = selectedDate && getSelectedDay() === day;  
          const eventColor = viewMode === 'appointments' ? 'blue' : 'green';  

          return (  
            <motion.div  
              key={day}  
              className={`p-1 sm:p-2 text-center cursor-pointer rounded hover:bg-${eventColor}-50 text-xs sm:text-sm relative ${isSelected ? `bg-${eventColor}-200 font-bold border-2 border-${eventColor}-400` : ''}`}  
              onClick={() => handleDateClick(day)}  
              whileHover={{ scale: 1.1 }}  
            >  
              <div className="font-medium z-10 relative">{day}</div>  
              {dayEventCount > 0 && (  
                <div className={`absolute -top-2 -right-1 text-xs bg-${eventColor}-200 rounded w-4 h-4 flex items-center justify-center z-10`}>{dayEventCount}</div>  
              )}  
            </motion.div>  
          );  
        })}  
      </div>  

      {/* Formulario solo para citas y día seleccionado sin eventos */}  
      {viewMode === 'appointments' && selectedDate && dayEvents.length === 0 && (  
        <div className="space-y-4">  
          <h4 className="text-lg font-bold">Nueva Cita para {new Date(selectedDate).toLocaleDateString('es-ES')}</h4>  
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">  
            <select  
              value={newAppt.patientId}  
              onChange={(e) => setNewAppt(prev => ({ ...prev, patientId: e.target.value }))}  
              className="px-3 sm:px-4 py-2 sm:py-3 border rounded-xl w-full text-sm sm:text-base"  
            >  
              <option value="">Seleccionar Paciente</option>  
              {patients.map(p => (  
                <option key={p.id} value={p.id}>{p.name}</option>  
              ))}  
            </select>  
            <input  
              type="time"  
              value={newAppt.time}  
              onChange={(e) => setNewAppt(prev => ({ ...prev, time: e.target.value }))}  
              className="px-3 sm:px-4 py-2 sm:py-3 border rounded-xl w-full text-sm sm:text-base"  
            />  
            <input  
              type="text"  
              value={newAppt.description}  
              onChange={(e) => setNewAppt(prev => ({ ...prev, description: e.target.value }))}  
              placeholder="Descripción"  
              className="px-3 sm:px-4 py-2 sm:py-3 border rounded-xl w-full text-sm sm:text-base"  
            />  
          </div>  
          <motion.button  
            onClick={handleAddAppt}  
            className="w-full bg-green-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-base"  
            whileHover={{ scale: 1.02 }}  
            disabled={!newAppt.patientId || !newAppt.time || !newAppt.description}  
          >  
            <Plus className="w-5 h-5" /> Agregar Cita  
          </motion.button>  
        </div>  
      )}  
    </motion.div>  
  );  
};  

export default CalendarView;