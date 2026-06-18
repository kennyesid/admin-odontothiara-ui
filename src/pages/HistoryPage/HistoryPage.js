import React, { useEffect, useState } from 'react';  
import PatientHistory from '@/components/PatientHistory';  
import { visitService } from '@/services/visit/VisitService';  
import { motion } from 'framer-motion';  

const HistoryPage = () => {  
  const [patients, setPatients] = useState([]);  

  useEffect(() => {  
    const loadPatients = async () => {  
      const data = await visitService.getPatientsWithVisits();  
      setPatients(data);  
    };  
    loadPatients();  
  }, []);  

  return (  
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">  
      <h2 className="text-2xl font-bold mb-6 text-center">Búsqueda de Movimientos de Pacientes</h2>  
      <PatientHistory patients={patients} setPatients={setPatients} />  
    </motion.div>  
  );  
};  

export default HistoryPage;