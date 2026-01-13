import React from 'react';  
import CalendarView from '@/components/Calendar/Calendar';  
import { defaultAppointments } from '@/mock/patients';  
import { useLocalStorage } from '@/utils/helpers';  
import { motion } from 'framer-motion';  

const CalendarPage = () => {  
  const [patients, setPatients] = useLocalStorage('patients', []);  
  const [appointments, setAppointments] = useLocalStorage('appointments', defaultAppointments);  

  const addAppointment = (apptData) => {  
    const newAppt = {  
      id: Date.now().toString(),  
      patientId: apptData.patientId,  
      date: apptData.date,  
      description: apptData.description  
    };  
    setAppointments(prev => [...prev, newAppt]);  
    alert('¡Cita agendada! No te olvides del cepillo. 🦷');  
  };  

  return (  
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">  
      <h2 className="text-2xl font-bold mb-6 text-center">Calendario de Citas</h2>  
      <CalendarView appointments={appointments} patients={patients} addAppointment={addAppointment} />  
    </motion.div>  
  );  
};  

export default CalendarPage;