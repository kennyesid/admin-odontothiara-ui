import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, RotateCcw } from 'lucide-react';

/**
 * GenericModal - Componente reutilizable para ventanas emergentes.
 * * @param {boolean} isOpen - Estado de visibilidad.
 * @param {function} onClose - Función para cerrar (Cancelar).
 * @param {function} onSave - Función para confirmar (Guardar).
 * @param {string} title - Título del modal.
 * @param {React.ReactNode} children - Contenido dinámico (Formularios).
 * @param {string} saveText - Texto personalizado para el botón de guardar.
 */
const GenericModalWithControl = ({
  isOpen,
  onClose,
  onSave,
  title = "Formulario",
  children,
  saveText = "Guardar Cambios",
  isSaving = false,
  footerActive = 0,
  onSubmitAlternativeIncrement,
  onSubmitAlternativeDecrement,
}) => {

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop / Fondo oscuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          />

          {/* Contenedor del Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none p-4"
          >
            <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto border border-gray-100">

              {/* Cabecera del Modal */}
              <div className="px-6 py-4 bg-gradient-to-r from-cyan-600 to-sky-600 text-white flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Cuerpo del Modal (Scrollable si el contenido es largo) */}
              <div className="h-[calc(100vh-10rem)] p-4 overflow-y-auto custom-scrollbar flex-grow">
                {children}
              </div>

              {/* Pie del Modal (Acciones) */}
              {
                footerActive >= 3 ? (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end items-center gap-3">
                    <button
                      type="button"
                      onClick={onSubmitAlternativeDecrement}
                      className="px-5 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-200 transition-all flex items-center gap-2"
                    >
                      <RotateCcw size={18} />
                      Anterior
                    </button>

                    <button
                      type="button"
                      onClick={onSave}
                      disabled={isSaving}
                      className={`
                    px-6 py-2.5 rounded-xl font-bold text-white shadow-lg flex items-center gap-2 transition-all
                    ${isSaving
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-cyan-600 hover:bg-cyan-700 active:scale-95 shadow-cyan-200'}
                  `}
                    >
                      {isSaving ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Save size={18} />
                      )}
                      {saveText}
                    </button>
                  </div>
                ) : (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end items-center gap-3">
                    {
                      footerActive > 1 && (
                        <button
                          type="button"
                          onClick={onSubmitAlternativeDecrement}
                          className="px-5 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-200 transition-all flex items-center gap-2"
                        >
                          <RotateCcw size={18} />
                          Anterior
                        </button>
                      )
                    }
                    <button
                      type="button"
                      onClick={onSubmitAlternativeIncrement}
                      className="px-5 py-2.5 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center gap-2"
                    >
                      <Save size={18} />
                      Siguiente
                    </button>
                  </div>
                )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GenericModalWithControl;