export const defaultPatients = [
  {
    id: "1",
    name: "Juan Pérez",
    visits: [
      {
        id: "v1",
        date: new Date("2024-10-15T10:00:00"),
        preObservations: "Dolor en muela del juicio superior derecha.",
        postObservations: "Extracción exitosa, aplicar hielo.",
        teethMarks: {
          18: [true, false, true, false, false],
          28: [false, false, false, true, false],
        }, // Ejemplo: diente 18 marcado en 1ro y 3ro punto
      },
    ],
  },
  {
    id: "2",
    name: "María López",
    visits: [
      {
        id: "v2",
        date: new Date("2024-10-10T14:30:00"),
        preObservations: "Caries en incisivos inferiores.",
        postObservations: "Limpieza y sellado realizado.",
        teethMarks: {
          31: [false, true, false, true, false],
          41: [true, true, true, false, true],
        },
      },
    ],
  },
];

export const defaultAppointments = [
  {
    id: "a1",
    patientId: "1",
    date: new Date("2024-10-20T09:00:00"),
    description: "Limpieza rutinaria",
  },
  {
    id: "a2",
    patientId: "2",
    date: new Date("2024-10-25T15:00:00"),
    description: "Revisión post-tratamiento",
  },
];
