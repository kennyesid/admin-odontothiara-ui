import React, { useState } from "react";
import PatientVisit from "@/components/PatientVisit";
import { defaultPatients } from "@/mock/patients";
import { useLocalStorage } from "@/utils/helpers";
import { motion } from "framer-motion";

const VisitPage = () => {
  const [patients, setPatients] = useLocalStorage("patients", defaultPatients);

  const handleSaveVisit = (visitData) => {
    // Buscar paciente o crear nuevo
    let updatedPatients = [...patients];
    const existingPatient = updatedPatients.find(
      (p) => p.name.toLowerCase() === visitData.patientName.toLowerCase()
    );
    if (existingPatient) {
      existingPatient.visits.push({
        id: Date.now().toString(),
        ...visitData,
        teethMarks: visitData.teethMarks,
      });
    } else {
      updatedPatients.push({
        id: Date.now().toString(),
        name: visitData.patientName,
        visits: [
          {
            id: Date.now().toString() + "_v",
            ...visitData,
            teethMarks: visitData.teethMarks,
          },
        ],
      });
    }
    setPatients(updatedPatients);
    alert("¡Visita guardada! Dale una sonrisa al paciente. 😁");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=" md:max-w-6xl lg:w-7xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Nueva Visita Médica
      </h2>
      <PatientVisit onSaveVisit={handleSaveVisit} />
    </motion.div>
  );
};

export default VisitPage;
