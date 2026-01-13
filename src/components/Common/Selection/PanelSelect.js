import React, { useState } from 'react';
import { User, Mail, Save, Mars, Venus, CircleHelp } from 'lucide-react';

export default function PanelSelect({ options, value, onChange }) {
    // const options = [
    //     {
    //         id: 'Masculino',
    //         label: 'Masculino',
    //         icon: Mars,
    //         color: 'text-blue-600',
    //         bg: 'bg-blue-50',
    //         border: 'border-blue-200'
    //     },
    //     {
    //         id: 'Femenino',
    //         label: 'Femenino',
    //         icon: Venus,
    //         color: 'text-pink-600',
    //         bg: 'bg-pink-50',
    //         border: 'border-pink-200'
    //     }
    // ];

    // const handleSelect = (id) => {
    //     if (typeof onChange === 'function') {
    //         onChange('Sexo', id);
    //     }
    // };

    return (
        <div className="space-y-2">
            <div className="grid grid-cols-2 gap-3">
                {options.map((option) => {
                    const Icon = option.icon;
                    const isSelected = value === option.id;
                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => onChange(option.id)}
                            className={`
                relative flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition-all duration-200 outline-none
                ${isSelected
                                    ? `${option.bg} ${option.border} ${option.color} scale-[1.02] shadow-sm`
                                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-slate-50'
                                }
              `}
                        >
                            {isSelected && (
                                <div className={`absolute top-2 right-2 w-4 h-4 rounded-full ${option.color.replace('text', 'bg')} flex items-center justify-center`}>
                                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                </div>
                            )}

                            <Icon size={24} className={`mb-2 ${isSelected ? option.color : 'text-slate-300'}`} />
                            <span className={`text-[13px] ${isSelected ? 'text-slate-800' : ''}`}>
                                {option.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

/**
 * Componente principal del Formulario (App)
 */
// export default function App() {
//     const [formData, setFormData] = useState({
//         Nombre: '',
//         Email: '',
//         Sexo: 'S/N'
//     });

//     const handleInputChange = (name, value) => {
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Datos enviados:', formData);
//         // Simulación de envío
//         const toast = document.createElement('div');
//         toast.className = "fixed bottom-5 right-5 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl animate-bounce z-50";
//         toast.innerText = "✓ Información guardada correctamente";
//         document.body.appendChild(toast);
//         setTimeout(() => toast.remove(), 3000);
//     };

//     return (
//         <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
//             <form
//                 onSubmit={handleSubmit}
//                 className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 p-8 space-y-6 border border-slate-100"
//             >
//                 <div className="space-y-2">
//                     <h1 className="text-3xl font-black text-slate-800 tracking-tight">Registro</h1>
//                     <p className="text-slate-500 text-sm font-medium">Complete los datos del perfil.</p>
//                 </div>

//                 {/* Campo: Nombre */}
//                 <div className="space-y-1">
//                     <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
//                         Nombre Completo
//                     </label>
//                     <div className="relative">
//                         <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
//                         <input
//                             type="text"
//                             placeholder="Juan Pérez"
//                             className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
//                             value={formData.Nombre}
//                             onChange={(e) => handleInputChange('Nombre', e.target.value)}
//                             required
//                         />
//                     </div>
//                 </div>

//                 {/* Campo: Email */}
//                 <div className="space-y-1">
//                     <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
//                         Correo Electrónico
//                     </label>
//                     <div className="relative">
//                         <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
//                         <input
//                             type="email"
//                             placeholder="juan@ejemplo.com"
//                             className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
//                             value={formData.Email}
//                             onChange={(e) => handleInputChange('Email', e.target.value)}
//                             required
//                         />
//                     </div>
//                 </div>

//                 {/* Selector de Género Integrado */}
//                 <CustomGenderSelect
//                     value={formData.Sexo}
//                     onChange={handleInputChange}
//                 />

//                 <button
//                     type="submit"
//                     className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all active:scale-[0.97] shadow-lg shadow-indigo-200"
//                 >
//                     <Save size={20} />
//                     Finalizar Registro
//                 </button>
//             </form>
//         </div>
//     );
// }