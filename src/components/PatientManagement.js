import React, { useState } from 'react';  
import { motion } from 'framer-motion';  
import { UserPlus, UserMinus, Search } from 'lucide-react';  

const PatientManagement = ({ patients, setPatients }) => {  
  const [newPatientName, setNewPatientName] = useState('');  
  const [searchQuery, setSearchQuery] = useState('');  

  const addPatient = () => {  
    if (newPatientName.trim()) {  
      const newPatient = {  
        id: Date.now().toString(),  
        name: newPatientName.trim(),  
        visits: []  
      };  
      setPatients(prev => [...prev, newPatient]);  
      setNewPatientName('');  
    }  
  };  

  const deletePatient = (id) => {  
    setPatients(prev => prev.filter(p => p.id !== id));  
  };  

  const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));  

  return (  
    <motion.div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl space-y-6 w-full"  
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}>  
      <div className="space-y-4">  
        <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">  
          <UserPlus className="w-5 h-5" /> Alta de Nuevo Paciente  
        </h3>  
        <div className="flex flex-col sm:flex-row gap-2">  
          <input  
            type="text"  
            value={newPatientName}  
            onChange={(e) => setNewPatientName(e.target.value)}  
            placeholder="Nombre del paciente"  
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none text-base"  
          />  
          <motion.button  
            onClick={addPatient}  
            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-xl font-semibold w-full sm:w-auto text-sm sm:text-base"  
            whileHover={{ scale: 1.05 }}  
          >  
            Agregar  
          </motion.button>  
        </div>  
      </div>  

      <div>  
        <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">  
          <Search className="w-5 h-5" /> Lista de Pacientes  
        </h3>  
        <input  
          type="text"  
          value={searchQuery}  
          onChange={(e) => setSearchQuery(e.target.value)}  
          placeholder="Buscar paciente..."  
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl mb-4 focus:outline-none text-base"  
        />  
        <ul className="space-y-3 max-h-96 overflow-y-auto">  
          {filteredPatients.map((patient) => (  
            <motion.li key={patient.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 bg-gray-50 rounded-xl gap-2"  
                       initial={{ x: -20 }} animate={{ x: 0 }} transition={{ delay: 0.1 }}>  
              <span className="font-medium text-sm sm:text-base">{patient.name} ({patient.visits.length} visitas)</span>  
              <motion.button  
                onClick={() => deletePatient(patient.id)}  
                className="px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg text-xs sm:text-sm w-full sm:w-auto flex items-center justify-center gap-1"  
                whileHover={{ scale: 0.95 }}  
              >  
                <UserMinus className="w-3 h-3 sm:w-4 sm:h-4" /> Bajar  
              </motion.button>  
            </motion.li>  
          ))}  
        </ul>  
        {filteredPatients.length === 0 && (  
          <p className="text-gray-500 text-center py-8 text-sm sm:text-base">No hay pacientes. ¡Agrega uno!</p>  
        )}  
      </div>  
    </motion.div>  
  );  
};  

export default PatientManagement;