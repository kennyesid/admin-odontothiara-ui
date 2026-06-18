import { supabase } from '@/config/supabaseClient';
import { userService } from '@/services/user/UserService';
import { defaultPatients } from '@/mock/patients';

// Visitas por defecto extraídas de los datos de prueba
const defaultVisits = [
  {
    id: "v1",
    patient_id: "1",
    patient_name: "Juan Pérez",
    date: "2024-10-15T10:00:00",
    pre_observations: "Dolor en muela del juicio superior derecha.",
    post_observations: "Extracción exitosa, aplicar hielo.",
    teeth_marks: {
      "18": [true, false, true, false, false],
      "28": [false, false, false, true, false],
    }
  },
  {
    id: "v2",
    patient_id: "2",
    patient_name: "María López",
    date: "2024-10-10T14:30:00",
    pre_observations: "Caries en incisivos inferiores.",
    post_observations: "Limpieza y sellado realizado.",
    teeth_marks: {
      "31": [false, true, false, true, false],
      "41": [true, true, true, false, true],
    }
  }
];

class VisitService {
  constructor() {
    this.storageKey = 'app_visits_list';
    // Pre-poblar caché local con visitas por defecto si está vacía
    if (!localStorage.getItem(this.storageKey)) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(defaultVisits));
      } catch (e) {
        console.error("Error al inicializar visitas locales por defecto:", e);
      }
    }
  }

  /**
   * Obtiene todas las visitas desde Supabase.
   * Si la base de datos está vacía, inserta las visitas por defecto.
   * @returns {Promise<Array>} Lista de visitas médicas.
   */
  async getAllVisits() {
    try {
      const { data, error } = await supabase
        .from('medical_visits')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error("Error al leer visitas de Supabase, usando local:", error);
        return this.getAllVisitsLocal();
      }

      // Si la tabla en Supabase está vacía, la inicializamos con las visitas de prueba
      if (data.length === 0) {
        console.log("Inicializando visitas médicas por defecto en Supabase...");
        const { error: insertError } = await supabase
          .from('medical_visits')
          .insert(defaultVisits);
        
        if (!insertError) {
          localStorage.setItem(this.storageKey, JSON.stringify(defaultVisits));
          return defaultVisits;
        }
      }

      // Mapeamos de snake_case a camelCase para la app
      const parsedVisits = data.map(v => ({
        id: v.id,
        patientId: v.patient_id,
        patientName: v.patient_name,
        date: v.date,
        preObservations: v.pre_observations,
        postObservations: v.post_observations,
        teethMarks: v.teeth_marks || {}
      }));

      try {
        localStorage.setItem(this.storageKey, JSON.stringify(parsedVisits));
      } catch (e) {
        console.warn("No se pudo escribir visitas en cache local:", e);
      }

      return parsedVisits;
    } catch (error) {
      console.error("Error en getAllVisits:", error);
      return this.getAllVisitsLocal();
    }
  }

  /**
   * Obtiene visitas de la cache de localStorage.
   */
  getAllVisitsLocal() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error al leer visitas locales:", error);
      return [];
    }
  }

  /**
   * Guarda una nueva visita médica en Supabase y localmente.
   * @param {Object} visitData Datos de la visita desde la UI.
   * @returns {Promise<boolean>} True si se guardó con éxito.
   */
  async saveVisit(visitData) {
    try {
      // Obtener listado de pacientes para resolver el ID
      const patients = await userService.getAllPatients();
      const patient = patients.find(p => p.name.toLowerCase() === visitData.patientName.toLowerCase());
      const patientId = patient ? String(patient.id) : String(Date.now()); // Fallback ID

      const mappedVisit = {
        id: visitData.id || crypto.randomUUID(),
        patient_id: patientId,
        patient_name: visitData.patientName,
        date: visitData.date,
        pre_observations: visitData.preObservations || '',
        post_observations: visitData.postObservations || '',
        teeth_marks: visitData.teethMarks || {}
      };

      const { error } = await supabase
        .from('medical_visits')
        .insert(mappedVisit);

      if (error) {
        console.error("Error al guardar visita en Supabase:", error);
        throw error;
      }

      // Guardar en local storage caché
      const localVisits = this.getAllVisitsLocal();
      const uiVisit = {
        id: mappedVisit.id,
        patientId: mappedVisit.patient_id,
        patientName: mappedVisit.patient_name,
        date: mappedVisit.date,
        preObservations: mappedVisit.pre_observations,
        postObservations: mappedVisit.post_observations,
        teethMarks: mappedVisit.teeth_marks
      };
      localVisits.unshift(uiVisit);
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(localVisits));
      } catch (e) {
        console.warn("No se pudo actualizar cache de visitas:", e);
      }

      return true;
    } catch (error) {
      console.error("Error en saveVisit, cayendo a local storage:", error);
      try {
        const localVisits = this.getAllVisitsLocal();
        const id = visitData.id || crypto.randomUUID();
        const localData = {
          id,
          patientId: visitData.patientId || String(Date.now()),
          patientName: visitData.patientName,
          date: visitData.date,
          preObservations: visitData.preObservations || '',
          postObservations: visitData.postObservations || '',
          teethMarks: visitData.teethMarks || {}
        };
        localVisits.unshift(localData);
        localStorage.setItem(this.storageKey, JSON.stringify(localVisits));
        return true;
      } catch (e) {
        return false;
      }
    }
  }

  /**
   * Obtiene la lista unificada de pacientes del sistema, inyectando su historial de visitas.
   * @returns {Promise<Array>} Lista de pacientes con .visits[]
   */
  async getPatientsWithVisits() {
    try {
      const patients = await userService.getAllPatients();
      const visits = await this.getAllVisits();

      // Mapear visitas a cada paciente
      return patients.map(p => {
        const patientIdStr = String(p.id);
        const patientVisits = visits.filter(v => String(v.patientId) === patientIdStr);
        return {
          ...p,
          visits: patientVisits
        };
      });
    } catch (error) {
      console.error("Error al cruzar pacientes y visitas:", error);
      return defaultPatients;
    }
  }
}

export const visitService = new VisitService();
