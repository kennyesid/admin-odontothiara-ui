import React, { useState } from 'react';  
import { motion } from 'framer-motion';  
import { Search, FileText } from 'lucide-react';  

const PatientHistory = ({ patients, setPatients }) => {  
  const [searchQuery, setSearchQuery] = useState('');  
  const [selectedPatient, setSelectedPatient] = useState(null);  

  const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));  

  const handleViewHistory = (patient) => {  
    setSelectedPatient(patient);  
  };  

  const getTeethDetails = (teethMarks) => {  
    const pointsLabels = ['Superior Izquierda', 'Superior Derecha', 'Inferior Izquierda', 'Inferior Derecha', 'Centro'];  
    let details = [];  
    Object.entries(teethMarks).forEach(([tooth, marks]) => {  
      const activePoints = marks  
        .map((marked, idx) => marked ? pointsLabels[idx] : null)  
        .filter(Boolean);  
      if (activePoints.length > 0) {  
        details.push(`Diente ${tooth}: ${activePoints.join(', ')}`);  
      }  
    });  
    return details.length > 0 ? details.join('; ') : 'Ninguno';  
  };  

  return (  
    <motion.div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl space-y-6 w-full"  
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}>  
      <div className="space-y-4">  
        <input  
          type="text"  
          value={searchQuery}  
          onChange={(e) => setSearchQuery(e.target.value)}  
          placeholder="Buscar paciente por nombre..."  
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none text-base flex items-center gap-2"  
        />  
        {!selectedPatient ? (  
          <ul className="space-y-3 max-h-96 overflow-y-auto">  
            {filteredPatients.map((patient) => (  
              <motion.button  
                key={patient.id}  
                onClick={() => handleViewHistory(patient)}  
                className="w-full p-3 sm:p-4 bg-gray-50 rounded-xl text-left hover:bg-gray-100 flex items-center gap-3 text-sm sm:text-base"  
                whileHover={{ scale: 1.02 }}  
              >  
                <FileText className="w-5 h-5 text-gray-500 flex-shrink-0" />  
                <span className="font-medium">{patient.name}</span>  
                <span className="text-sm text-gray-500 ml-auto">({patient.visits.length} movimientos)</span>  
              </motion.button>  
            ))}  
          </ul>  
        ) : (  
          <div className="space-y-4">  
            <h3 className="text-lg sm:text-xl font-bold">{selectedPatient.name} - Historial</h3>  
            <ul className="space-y-3 max-h-80 overflow-y-auto">  
              {selectedPatient.visits.map((visit) => (  
                <motion.li key={visit.id} className="p-3 sm:p-4 bg-gray-50 rounded-xl"  
                           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>  
                  <div className="space-y-2">  
                    <p className="font-medium text-sm sm:text-base">{new Date(visit.date).toLocaleString()}</p>  
                    <p className="text-sm text-gray-600">Antes: {visit.preObservations || 'N/A'}</p>  
                    <p className="text-sm text-gray-600">Después: {visit.postObservations || 'N/A'}</p>  
                    <p className="text-xs sm:text-sm text-gray-500">Puntos marcados: {getTeethDetails(visit.teethMarks)}</p>  
                  </div>  
                </motion.li>  
              ))}  
            </ul>  
            <motion.button  
              onClick={() => setSelectedPatient(null)}  
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-500 text-white rounded-xl"  
              whileHover={{ scale: 1.05 }}  
            >  
              Volver a Búsqueda  
            </motion.button>  
          </div>  
        )}  
      </div>  
    </motion.div>  
  );  
};  

export default PatientHistory;