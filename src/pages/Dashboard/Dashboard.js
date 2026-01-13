import React from 'react';  
import { motion } from 'framer-motion';  
import { Users, FileText, Calendar as CalIcon } from 'lucide-react';  
import { defaultPatients, defaultAppointments } from '@/mock/patients';  

const Dashboard = () => {  
  const totalPatients = defaultPatients.length;  
  const totalVisits = defaultPatients.reduce((acc, p) => acc + p.visits.length, 0);  
  const upcomingAppts = defaultAppointments.filter(appt => new Date(appt.date) > new Date()).length;  

  return (  
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 sm:space-y-8 w-full">  
      <div className="text-center">  
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">  
          Bienvenido a DentalPro  
        </h1>  
        <p className="text-gray-600 text-sm sm:text-base">Tu sistema todo-en-uno para odontología. ¡Sonríe mientras organizas!</p>  
      </div>  

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">  
        <motion.div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-4 sm:p-6 shadow-xl text-center"  
                    whileHover={{ y: -5 }}>  
          <Users className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-3 sm:mb-4" />  
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-sm sm:text-base">Pacientes Totales</h3>  
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{totalPatients}</p>  
        </motion.div>  

        <motion.div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-4 sm:p-6 shadow-xl text-center"  
                    whileHover={{ y: -5 }}>  
          <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 mx-auto mb-3 sm:mb-4" />  
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-sm sm:text-base">Visitas Registradas</h3>  
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{totalVisits}</p>  
        </motion.div>  

        <motion.div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-4 sm:p-6 shadow-xl text-center"  
                    whileHover={{ y: -5 }}>  
          <CalIcon className="w-10 h-10 sm:w-12 sm:h-12 text-purple-500 mx-auto mb-3 sm:mb-4" />  
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-sm sm:text-base">Citas Próximas</h3>  
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{upcomingAppts}</p>  
        </motion.div>  
      </div>  
    </motion.div>  
  );  
};  

export default Dashboard;