import React from 'react';  
import { defaultPatients, defaultAppointments } from '../mock/patients';  

export const useLocalStorage = (key, initialValue) => {  
  const [storedValue, setStoredValue] = React.useState(() => {  
    try {  
      const item = window.localStorage.getItem(key);  
      return item ? JSON.parse(item) : initialValue;  
    } catch (error) {  
      return initialValue;  
    }  
  });  

  const setValue = React.useCallback((value) => {  
    try {  
      const valueToStore = value instanceof Function ? value(storedValue) : value;  
      setStoredValue(valueToStore);  
      window.localStorage.setItem(key, JSON.stringify(valueToStore));  
    } catch (error) {  
      // Ignore  
    }  
  }, [storedValue, key]);  

  return [storedValue, setValue];  
};  

export const searchPatients = (patients, query) => {  
  if (!query) return patients;  
  return patients.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));  
};