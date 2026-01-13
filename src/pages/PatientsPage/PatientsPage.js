import React from 'react';  
import PatientManagement from '@/components/PatientManagement';  
import { defaultPatients } from '@/mock/patients';  
import { useLocalStorage } from '@/utils/helpers';  
import { motion } from 'framer-motion';  

const PatientsPage = () => {  
  const [patients, setPatients] = useLocalStorage('patients', defaultPatients);  

  return (  
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">  
      <h2 className="text-2xl font-bold mb-6 text-center">Gestión de Pacientes (Alta y Bajas)</h2>  
      <PatientManagement patients={patients} setPatients={setPatients} />  
    </motion.div>  
  );  
};  

export default PatientsPage;