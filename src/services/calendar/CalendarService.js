import { defaultAppointments } from '@/mock/patients';
import { supabase } from '@/config/supabaseClient';
import { visitService } from '@/services/visit/VisitService';

class CalendarService {
  constructor() {
    this.appointmentsKey = 'app_appointments_list';
    // Pre-populate with default appointments if empty in localStorage
    if (!localStorage.getItem(this.appointmentsKey)) {
      try {
        localStorage.setItem(this.appointmentsKey, JSON.stringify(defaultAppointments));
      } catch (error) {
        console.error("Error al inicializar citas por defecto en local:", error);
      }
    }
  }

  /**
   * Obtiene todas las citas de Supabase.
   * Si está vacía la base de datos, inserta las de prueba en Supabase.
   * @returns {Promise<Array>} Lista de citas.
   */
  async getAllAppointments() {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('date', { ascending: true });

      if (error) {
        console.error("Error al obtener citas de Supabase, usando local storage:", error);
        return this.getAllAppointmentsLocal();
      }

      // Si la tabla de citas en Supabase está vacía, la poblamos inicialmente
      if (data.length === 0) {
        console.log("Inicializando citas por defecto en Supabase...");
        const { error: insertError } = await supabase
          .from('appointments')
          .insert(defaultAppointments.map(a => ({
            id: a.id,
            patient_id: a.patientId,
            date: a.date,
            description: a.description
          })));

        if (!insertError) {
          localStorage.setItem(this.appointmentsKey, JSON.stringify(defaultAppointments));
          return defaultAppointments;
        }
      }

      // Mapeamos de snake_case a camelCase para la app
      const parsedAppointments = data.map(appt => ({
        id: appt.id,
        patientId: appt.patient_id,
        date: appt.date,
        description: appt.description
      }));

      try {
        localStorage.setItem(this.appointmentsKey, JSON.stringify(parsedAppointments));
      } catch (e) {
        console.warn("No se pudo escribir cache de citas local:", e);
      }

      return parsedAppointments;
    } catch (error) {
      console.error("Error al obtener citas:", error);
      return this.getAllAppointmentsLocal();
    }
  }

  /**
   * Obtiene las citas de la cache local.
   */
  getAllAppointmentsLocal() {
    try {
      const data = localStorage.getItem(this.appointmentsKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error al leer citas locales:", error);
      return [];
    }
  }

  /**
   * Guarda una nueva cita o actualiza una existente en Supabase y localmente.
   * @param {Object} apptData - Datos de la cita.
   * @returns {Promise<boolean>} True si se guardó con éxito.
   */
  async saveAppointment(apptData) {
    try {
      const mapped = {
        id: apptData.id || crypto.randomUUID(),
        patient_id: String(apptData.patientId),
        date: apptData.date, // ISO string
        description: apptData.description
      };

      const { error } = await supabase
        .from('appointments')
        .upsert(mapped, { onConflict: 'id' });

      if (error) {
        console.error("Error al guardar cita en Supabase:", error);
        throw error;
      }

      // Sincronizar en local storage
      const appointments = this.getAllAppointmentsLocal();
      const uiAppt = {
        id: mapped.id,
        patientId: mapped.patient_id,
        date: mapped.date,
        description: mapped.description
      };

      const index = appointments.findIndex(a => a.id === uiAppt.id);
      if (index !== -1) {
        appointments[index] = uiAppt;
      } else {
        appointments.push(uiAppt);
      }

      try {
        localStorage.setItem(this.appointmentsKey, JSON.stringify(appointments));
      } catch (e) {
        console.warn("No se pudo escribir en cache de citas:", e);
      }

      return true;
    } catch (error) {
      console.error("Error al guardar cita, cayendo a local storage:", error);
      try {
        const appointments = this.getAllAppointmentsLocal();
        const uiAppt = {
          id: apptData.id || crypto.randomUUID(),
          patientId: String(apptData.patientId),
          date: apptData.date,
          description: apptData.description
        };
        const index = appointments.findIndex(a => a.id === uiAppt.id);
        if (index !== -1) {
          appointments[index] = uiAppt;
        } else {
          appointments.push(uiAppt);
        }
        localStorage.setItem(this.appointmentsKey, JSON.stringify(appointments));
        return true;
      } catch (e) {
        return false;
      }
    }
  }

  /**
   * Elimina una cita por su ID de Supabase y localmente.
   * @param {string} id - ID de la cita.
   * @returns {Promise<boolean>} True si se eliminó con éxito.
   */
  async deleteAppointment(id) {
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error al eliminar cita en Supabase:", error);
        throw error;
      }

      // Eliminar de local storage
      const appointments = this.getAllAppointmentsLocal();
      const filtered = appointments.filter(a => a.id !== id);
      try {
        localStorage.setItem(this.appointmentsKey, JSON.stringify(filtered));
      } catch (e) {
        console.warn("No se pudo actualizar cache de citas locales:", e);
      }

      return true;
    } catch (error) {
      console.error("Error al eliminar cita, cayendo a local storage:", error);
      try {
        const appointments = this.getAllAppointmentsLocal();
        const filtered = appointments.filter(a => a.id !== id);
        localStorage.setItem(this.appointmentsKey, JSON.stringify(filtered));
        return true;
      } catch (e) {
        return false;
      }
    }
  }

  /**
   * Obtiene la lista unificada de pacientes del sistema con su historial de visitas.
   * Delegado a VisitService.
   * @returns {Promise<Array>} Lista de pacientes.
   */
  async getPatients() {
    return visitService.getPatientsWithVisits();
  }
}

export const calendarService = new CalendarService();
