import React, { useState, useRef, useEffect } from 'react';
import {
    User, Activity, Thermometer, Baby, CheckCircle2,
    ChevronRight, ChevronLeft, Camera, Upload,
    MapPin, Phone, Mail, CreditCard, Briefcase, Heart,
    Mars,
    Venus,
    AlertCircle
} from 'lucide-react';
import PatientRegistration from '@/models/dtos/CreateUser/PatientRegistration';
import PanelSelect from '@/components/Common/Selection/PanelSelect';
import { cutImageAndSetBase64 } from '@/utils/imageUtil';
import { STYLE_ROOT } from '@/styles/styleGeneric';
import ButtonGeneric from '@/components/Common/Button/ButtonGeneric';
import { getFlatQuestionsByGroupId } from '@/services/medical/medicalQuestionsService';

const options = [
    {
        id: 'Masculino',
        label: 'Masculino',
        icon: Mars,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200'
    },
    {
        id: 'Femenino',
        label: 'Femenino',
        icon: Venus,
        color: 'text-pink-600',
        bg: 'bg-pink-50',
        border: 'border-pink-200'
    }
];

const UserForm = ({ formData, setFormData, onSave }) => {
    const [step, setStep] = useState(1);
    const fileInputRef = useRef(null);
    const [errors, setErrors] = useState({});

    const [dynamicQuestions, setDynamicQuestions] = useState([]);
    const [loadingQuestions, setLoadingQuestions] = useState(true);

    const totalSteps = formData.Sexo === "Femenino" ? 4 : 3;
    const isFemale = formData.Sexo === "Femenino";

    useEffect(() => {
        async function fetchQuestions() {
            setLoadingQuestions(true);
            const response = await getFlatQuestionsByGroupId(); // Sin parámetros, perfecto.
            console.log(JSON.stringify(response));
            // 👈 Cambiado "codigo" por "code" para hacer match con tu nuevo helper
            if (response.code === 200 && response.content) {
                setDynamicQuestions(response.content);

                setFormData(prev => ({
                    ...prev,
                    dynamicAnswers: prev.dynamicAnswers || {}
                }));
            }
            setLoadingQuestions(false);
        }
        fetchQuestions();
    }, []);


    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const updateNestedField = (objectKey, field, value) => {
        setFormData(prev => ({
            ...prev,
            [objectKey]: { ...prev[objectKey], [field]: value }
        }));
    };

    const handleDynamicAnswerChange = (questionId, field, value) => {
        setFormData(prev => {
            const currentAnswers = prev.dynamicAnswers || {};
            const currentQuestionAnswer = currentAnswers[questionId] || { checked: false, reason: '' };

            return {
                ...prev,
                dynamicAnswers: {
                    ...currentAnswers,
                    [questionId]: {
                        ...currentQuestionAnswer,
                        [field]: value
                    }
                }
            };
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const cutImage = await cutImageAndSetBase64(file);
            updateField('Image', cutImage);
        }


        console.log('sin utilizar la funcion: ' + formData.Image);
        const asdasd = formData;
    };

    const roles = [
        { id: 1, name: "Administrador" },
        { id: 2, name: "Paciente" },
        { id: 3, name: "Médico" }
    ];

    const handleOnchange = (value) => {
        updateField('Sexo', value)
    }

    const validateFields = () => {
        const newErrors = {};
        if (!formData.Name.trim()) newErrors.Name = "El nombre es obligatorio";
        if (!formData.FirstSurname.trim()) newErrors.FirstSurname = "El apellido paterno es obligatorio";
        if (!formData.IdentityCard.trim()) newErrors.IdentityCard = "El CI es obligatorio";
        if (!formData.BirthDate) newErrors.BirthDate = "La fecha de nacimiento es necesaria";
        if (!formData.Phone.trim()) newErrors.Phone = "El teléfono es obligatorio";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSaveInternal = () => {

        if (validateFields()) {
            onSave(formData);
        } else {
            setStep(1);
        }
    };

    const labelStyle = "block text-xs font-semibold text-slate-500  tracking-wider mb-1 ml-1";
    const inputStyle = (fieldName) => `w-full px-2 py-1.5 bg-slate-50 border ${errors[fieldName] ? 'border-red-400 ring-2 ring-red-50' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 placeholder:text-slate-400`;
    const cardStyle = "p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow";

    const filteredQuestions = dynamicQuestions.filter(q => {
        const type = q.question_type?.toLowerCase();
        if (type === 'man' && formData?.Sexo === 'Femenino') return false;
        if (type === 'woman' && formData?.Sexo === 'Masculino') return false;
        return true;
    });

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header Steps */}
            <div className={`mb-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-3 md:px-12 shadow-sm border border-slate-100 flex-shrink-0 ${STYLE_ROOT.roundedPanelMain}`}>
                <div>
                    <h1 className="text-3xl font-black text-[#052a3d] tracking-tight">
                        Registro de <span className="text-[#19d1e6]">Pacientes</span>
                    </h1>
                </div>

                <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-2xl border border-slate-200 self-start md:self-auto">
                    {[1, 2, 3, 4].map((num) => (
                        num <= totalSteps && (
                            <div key={num} className="flex items-center">
                                <div className={`flex items-center justify-center w-6 h-6 rounded-xl text-sm font-bold transition-all shadow-sm ${step === num ? 'bg-[#052a3d] text-white scale-110 shadow-blue-200' :
                                    step > num ? 'bg-[#117192] text-white' : 'bg-white text-slate-400 border border-slate-200'
                                    }`}>
                                    {step > num ? <CheckCircle2 size={16} /> : num}
                                </div>
                                {num < totalSteps && (
                                    <div className={`w-4 h-0.2 mx-1 rounded-full ${step > num ? 'bg-green-500' : 'bg-slate-200'}`} />
                                )}
                            </div>
                        )
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className={`bg-white shadow-sm border border-slate-100 flex flex-col flex-1 overflow-hidden ${STYLE_ROOT.roundedPanelMain}`}>
                <div className="flex-1 overflow-y-auto p-8 md:px-12 custom-scrollbar">

                    {/* PASO 1: Identidad (Estático) */}
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-3">
                            <div className="flex flex-col md:flex-row gap-10">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative group">
                                        <div className="w-28 h-28 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-400">
                                            {formData.Image ? (
                                                <img src={formData.Image} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <Camera className="text-slate-400 w-10 h-10 group-hover:text-blue-500 transition-colors" />
                                            )}
                                        </div>
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`absolute -bottom-2 -right-2 p-2 rounded-xl shadow-lg transition-transform active:scale-90 ${STYLE_ROOT.primary}`}
                                        >
                                            <Upload size={16} />
                                        </button>
                                    </div>
                                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                                </div>

                                <div className='flex flex-col w-full'>
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-2">
                                        <div>
                                            <label className={labelStyle}>Nombres <span className="text-red-500">*</span></label>
                                            <input type="text" className={inputStyle('Name')} value={formData.Name || ''} onChange={e => updateField('Name', e.target.value)} placeholder="Kevin Matthew" />
                                            {errors.Name && <p className="text-red-500 text-[10px] mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.Name}</p>}
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Apellido Paterno <span className="text-red-500">*</span></label>
                                            <input type="text" className={inputStyle('FirstSurname')} value={formData.FirstSurname || ''} onChange={e => updateField('FirstSurname', e.target.value)} placeholder="Sacaca" />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Apellido Materno</label>
                                            <input type="text" className={inputStyle()} value={formData.SecondSurname || ''} onChange={e => updateField('SecondSurname', e.target.value)} placeholder="Carrasco" />
                                        </div>
                                    </div>
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div>
                                            <label className={labelStyle}>Cédula de Identidad <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <CreditCard className="absolute left-3 top-3 text-slate-400" size={18} />
                                                <input type="text" className={`${inputStyle('IdentityCard')} pl-10`} value={formData.IdentityCard || ''} onChange={e => updateField('IdentityCard', e.target.value)} placeholder="1234567-LP" />
                                                {errors.IdentityCard && <p className="text-red-500 text-[10px] mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.IdentityCard}</p>}
                                            </div>
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Fecha Nacimiento <span className="text-red-500">*</span></label>
                                            <input type="date" className={inputStyle('BirthDate')} value={formData.BirthDate || ''} onChange={e => updateField('BirthDate', e.target.value)} />
                                            {errors.BirthDate && <p className="text-red-500 text-[10px] mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.BirthDate}</p>}
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Teléfono / Celular <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
                                                <input type="text" className={`${inputStyle('Phone')} pl-10`} value={formData.Phone || ''} onChange={e => updateField('Phone', e.target.value)} placeholder="+591 70000000" />
                                                {errors.Phone && <p className="text-red-500 text-[10px] mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.Phone}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className={labelStyle}>Rol</label>
                                    <select className={inputStyle()} value={formData.RolId || 2} onChange={e => updateField('RolId', parseInt(e.target.value))}>
                                        {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className={labelStyle}>Lugar de Nacimiento</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                                        <input type="text" className={`${inputStyle()} pl-10`} value={formData.PlaceOfBirth || ''} onChange={e => updateField('PlaceOfBirth', e.target.value)} placeholder="Ej. La Paz, Bolivia" />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelStyle}>Ocupación</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-3 text-slate-400" size={18} />
                                        <input type="text" className={`${inputStyle()} pl-10`} value={formData.Occupation || ''} onChange={e => updateField('Occupation', e.target.value)} placeholder="Ej. Ingeniero Civil" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2">
                                    <label className={labelStyle}>Dirección de Domicilio</label>
                                    <input type="text" className={inputStyle()} value={formData.Address || ''} onChange={e => updateField('Address', e.target.value)} placeholder="Ej. Av. Siempre Viva #123, Zona Central" />
                                </div>
                                <div>
                                    <label className={labelStyle}>Estado Civil</label>
                                    <select className={inputStyle()} value={formData.MaritalStatus || 'S/N'} onChange={e => updateField('MaritalStatus', e.target.value)}>
                                        <option value="S/N">Seleccionar...</option>
                                        <option value="Soltero/a">Soltero/a</option>
                                        <option value="Casado/a">Casado/a</option>
                                        <option value="Divorciado/a">Divorciado/a</option>
                                        <option value="Viudo/a">Viudo/a</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className='md:col-span-2'>
                                    <label className={labelStyle}>Correo Electrónico</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                                        <input type="email" className={`${inputStyle()} pl-10`} value={formData.Email || ''} onChange={e => updateField('Email', e.target.value)} placeholder="correo@ejemplo.com" />
                                    </div>
                                </div>
                                <div>
                                    <PanelSelect value={formData.Sexo} options={options} onChange={handleOnchange} />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                            {loadingQuestions ? (
                                <p className="text-center text-slate-400 py-4">Cargando cuestionario médico...</p>
                            ) : (
                                <>
                                    {/* Grid Principal de Switches/Botones */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                        {filteredQuestions.map(q => {
                                            const ans = formData?.dynamicAnswers?.[q.id] || { checked: false, reason: '' };
                                            const isWomanType = q.question_type?.toLowerCase() === 'woman';

                                            return (
                                                <div
                                                    key={q.id}
                                                    className={`${cardStyle} ${isWomanType ? 'border-pink-100 bg-pink-50/20' : ''}`}
                                                >
                                                    <div className="flex items-center justify-between gap-3 mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`p-1.5 rounded-lg ${isWomanType ? 'bg-pink-100 text-pink-600' : 'bg-slate-100 text-slate-600'}`}>
                                                                <Activity size={14} />
                                                            </div>
                                                            <span className={`text-[11px] font-black uppercase tracking-tight ${isWomanType ? 'text-pink-900' : 'text-slate-700'}`}>
                                                                {q.question_text}
                                                            </span>
                                                        </div>

                                                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                                            <input
                                                                type="checkbox"
                                                                className="sr-only peer"
                                                                checked={ans.checked}
                                                                onChange={e => handleDynamicAnswerChange(q.id, 'checked', e.target.checked)}
                                                            />
                                                            <div className={`w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${isWomanType ? 'peer-checked:bg-pink-600' : 'peer-checked:bg-blue-600'}`}></div>
                                                        </label>
                                                    </div>

                                                    {/* Input en línea si requiere una observación corta (tipo Hábito) y no es área de texto extensa */}
                                                    {ans.checked && q.requires_reason && q.question_type?.toLowerCase() !== 'pathological' && (
                                                        <input
                                                            type="text"
                                                            placeholder={q.reason_label || "Especificar..."}
                                                            className={`mt-2 w-full px-2 py-1 text-xs rounded-lg border outline-none ${isWomanType ? 'border-pink-200 focus:border-pink-500 bg-white text-pink-900' : 'border-slate-200 focus:border-blue-500 bg-slate-50'}`}
                                                            value={ans.reason}
                                                            onChange={e => handleDynamicAnswerChange(q.id, 'reason', e.target.value)}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Textareas para observaciones extendidas (Ej. Patologías complejas activadas arriba) */}
                                    <div className="space-y-4 pt-6 border-t border-slate-100">
                                        {filteredQuestions
                                            .filter(q => q.requires_reason && formData?.dynamicAnswers?.[q.id]?.checked && q.question_type?.toLowerCase() === 'pathological')
                                            .map(q => (
                                                <div key={q.id} className="animate-in zoom-in-95">
                                                    <label className={labelStyle}>{q.reason_label || `Detalles médicos de: ${q.question_text}`}</label>
                                                    <textarea
                                                        className={`${inputStyle()} h-20 resize-none text-xs`}
                                                        value={formData?.dynamicAnswers?.[q.id]?.reason || ''}
                                                        onChange={e => handleDynamicAnswerChange(q.id, 'reason', e.target.value)}
                                                        placeholder="Escriba especificaciones médicas, diagnósticos previos o tratamientos actuales..."
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Navegación de Pasos */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between flex-shrink-0">
                    <button
                        type="button"
                        onClick={() => setStep(prev => Math.max(1, prev - 1))}
                        disabled={step === 1}
                        className="px-4 py-2 border border-slate-200 rounded-xl flex items-center gap-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-50 transition-all"
                    >
                        <ChevronLeft size={16} /> Atrás
                    </button>

                    {step < totalSteps ? (
                        <button
                            type="button"
                            onClick={() => {
                                if (step === 1 && !validateFields()) return;
                                setStep(prev => prev + 1);
                            }}
                            className="px-4 py-2 bg-[#052a3d] text-white rounded-xl flex items-center gap-2 text-sm font-semibold hover:bg-[#117192] transition-all shadow-sm"
                        >
                            Siguiente <ChevronRight size={16} />
                        </button>
                    ) : (
                        <ButtonGeneric
                            label="Guardar Paciente"
                            onClick={onSaveInternal}
                            className="shadow-md"
                        />
                    )}
                </div>
            </div>
        </div>
    );

    // return (
    //     <div className="flex flex-col h-full overflow-hidden">
    //         <div className={`mb-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-3 md:px-12 shadow-sm border border-slate-100 flex-shrink-0 ${STYLE_ROOT.roundedPanelMain}`}>
    //             <div>
    //                 <h1 className="text-3xl font-black text-[#052a3d] tracking-tight">
    //                     Registro de <span className="text-[#19d1e6]">Pacientes</span>
    //                 </h1>
    //             </div>

    //             <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-2xl border border-slate-200 self-start md:self-auto">
    //                 {[1, 2, 3, 4].map((num) => (
    //                     num <= totalSteps && (
    //                         <div key={num} className="flex items-center">
    //                             <div className={`flex items-center justify-center w-6 h-6 rounded-xl text-sm font-bold transition-all shadow-sm ${step === num ? 'bg-[#052a3d] text-white scale-110 shadow-blue-200' :
    //                                 step > num ? 'bg-[#117192] text-white' : 'bg-white text-slate-400 border border-slate-200'
    //                                 }`}>
    //                                 {step > num ? <CheckCircle2 size={16} /> : num}
    //                             </div>
    //                             {num < totalSteps && (
    //                                 <div className={`w-4 h-0.2 mx-1 rounded-full ${step > num ? 'bg-green-500' : 'bg-slate-200'}`} />
    //                             )}
    //                         </div>
    //                     )
    //                 ))}
    //             </div>
    //         </div>

    //         {/* Content Area */}
    //         {/* <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 flex flex-col flex-1 overflow-hidden"> */}
    //         <div className={`bg-white shadow-sm border border-slate-100 flex flex-col flex-1 overflow-hidden ${STYLE_ROOT.roundedPanelMain}`}>
    //             <div className="flex-1 overflow-y-auto p-8 md:px-12 custom-scrollbar">
    //                 {/* PASO 1: Identidad */}
    //                 {step === 1 && (
    //                     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-3">
    //                         <div className="flex flex-col md:flex-row gap-10">
    //                             {/* Image Upload Section */}
    //                             <div className="flex flex-col items-center gap-4">
    //                                 <div className="relative group">
    //                                     <div className="w-28 h-28 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-400">
    //                                         {formData.Image ? (
    //                                             <img src={formData.Image} alt="Profile" className="w-full h-full object-cover" />
    //                                         ) : (
    //                                             <Camera className="text-slate-400 w-10 h-10 group-hover:text-blue-500 transition-colors" />
    //                                         )}
    //                                     </div>
    //                                     <button
    //                                         onClick={() => fileInputRef.current?.click()}
    //                                         className={`absolute -bottom-2 -right-2 p-2  rounded-xl shadow-lg  transition-transform active:scale-90 ${STYLE_ROOT.primary}`}
    //                                     >
    //                                         <Upload size={16} />
    //                                     </button>
    //                                 </div>
    //                                 <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
    //                                 {/* <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Foto de Perfil</span> */}
    //                             </div>

    //                             {/* Fields Grid */}
    //                             <div className='flex flex-col w-full'>
    //                                 <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-2">
    //                                     <div className="lg:col-span-1 ">
    //                                         <label className={labelStyle}>Nombres <span className="text-red-500">*</span></label>
    //                                         <input type="text" className={inputStyle('Name')} value={formData.Name} onChange={e => updateField('Name', e.target.value)} placeholder="Kevin Matthew" />
    //                                         {errors.Name && <p className="text-red-500 text-[10px] mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.Name}</p>}
    //                                     </div>
    //                                     <div>
    //                                         <label className={labelStyle}>Apellido Paterno <span className="text-red-500">*</span></label>
    //                                         <input type="text" className={inputStyle('FirstSurname')} value={formData.FirstSurname} onChange={e => updateField('FirstSurname', e.target.value)} placeholder="Sacaca" />
    //                                     </div>
    //                                     <div>
    //                                         <label className={labelStyle}>Apellido Materno</label>
    //                                         <input type="text" className={inputStyle()} value={formData.SecondSurname} onChange={e => updateField('SecondSurname', e.target.value)} placeholder="Carrasco" />
    //                                     </div>
    //                                 </div>
    //                                 <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //                                     <div className="lg:col-span-1">
    //                                         <label className={labelStyle}>Cédula de Identidad <span className="text-red-500">*</span></label>
    //                                         <div className="relative">
    //                                             <CreditCard className="absolute left-3 top-3 text-slate-400" size={18} />
    //                                             <input type="text" className={`${inputStyle('IdentityCard')} pl-10`} value={formData.IdentityCard} onChange={e => updateField('IdentityCard', e.target.value)} placeholder="1234567-LP" />
    //                                             {errors.IdentityCard && <p className="text-red-500 text-[10px] mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.IdentityCard}</p>}
    //                                         </div>
    //                                     </div>
    //                                     <div>
    //                                         <label className={labelStyle}>Fecha Nacimiento <span className="text-red-500">*</span></label>
    //                                         <input type="date" className={inputStyle('BirthDate')} value={formData.BirthDate} onChange={e => updateField('BirthDate', e.target.value)} />
    //                                         {errors.BirthDate && <p className="text-red-500 text-[10px] mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.BirthDate}</p>}
    //                                     </div>
    //                                     <div>
    //                                         <label className={labelStyle}>Teléfono / Celular <span className="text-red-500">*</span></label>
    //                                         <div className="relative">
    //                                             <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
    //                                             <input type="text" className={`${inputStyle('Phone')} pl-10`} value={formData.Phone} onChange={e => updateField('Phone', e.target.value)} placeholder="+591 70000000" />
    //                                             {errors.Phone && <p className="text-red-500 text-[10px] mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.Phone}</p>}
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                                 {/* <div className="flex-1 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
    //                                         <PanelSelect value={formData.Sexo} onChange={e => updateField('Sexo', e.target.value)} />
    //                                     </div> */}
    //                             </div>
    //                         </div>

    //                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //                             <div>
    //                                 <label className={labelStyle}>Rol</label>
    //                                 <select className={inputStyle()} value={formData.RolId} onChange={e => updateField('RolId', parseInt(e.target.value))}>
    //                                     {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
    //                                 </select>
    //                             </div>
    //                             <div>
    //                                 <label className={labelStyle}>Lugar de Nacimiento</label>
    //                                 <div className="relative">
    //                                     <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
    //                                     <input type="text" className={`${inputStyle()} pl-10`} value={formData.PlaceOfBirth} onChange={e => updateField('PlaceOfBirth', e.target.value)} placeholder="Ej. La Paz, Bolivia" />
    //                                 </div>
    //                             </div>
    //                             <div>
    //                                 <label className={labelStyle}>Ocupación</label>
    //                                 <div className="relative">
    //                                     <Briefcase className="absolute left-3 top-3 text-slate-400" size={18} />
    //                                     <input type="text" className={`${inputStyle()} pl-10`} value={formData.Occupation} onChange={e => updateField('Occupation', e.target.value)} placeholder="Ej. Ingeniero Civil" />
    //                                 </div>
    //                             </div>
    //                         </div>

    //                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //                             <div className="md:col-span-2">
    //                                 <label className={labelStyle}>Dirección de Domicilio</label>
    //                                 <input type="text" className={inputStyle()} value={formData.Address} onChange={e => updateField('Address', e.target.value)} placeholder="Ej. Av. Siempre Viva #123, Zona Central" />
    //                             </div>
    //                             <div>
    //                                 <label className={labelStyle}>Estado Civil</label>
    //                                 <select className={inputStyle()} value={formData.MaritalStatus} onChange={e => updateField('MaritalStatus', e.target.value)}>
    //                                     <option value="S/N">Seleccionar...</option>
    //                                     <option value="Soltero/a">Soltero/a</option>
    //                                     <option value="Casado/a">Casado/a</option>
    //                                     <option value="Divorciado/a">Divorciado/a</option>
    //                                     <option value="Viudo/a">Viudo/a</option>
    //                                 </select>
    //                             </div>
    //                         </div>

    //                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
    //                             <div className='md:col-span-2'>
    //                                 <label className={labelStyle}>Correo Electrónico</label>
    //                                 <div className="relative">
    //                                     <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
    //                                     <input type="email" className={`${inputStyle()} pl-10`} value={formData.Email} onChange={e => updateField('Email', e.target.value)} placeholder="correo@ejemplo.com" />
    //                                 </div>
    //                             </div>
    //                             <div>
    //                                 {/* <PanelSelect value={formData.Sexo} onChange={e => updateField('Sexo', e.target.value)} /> */}
    //                                 <PanelSelect value={formData.Sexo} options={options} onChange={handleOnchange} />
    //                             </div>
    //                         </div>
    //                     </div>
    //                 )}

    //                 {/* PASO 2: Hábitos */}
    //                 {step === 2 && (
    //                     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-3">
    //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //                             <div className={cardStyle}>
    //                                 <div className="flex items-center justify-between mb-4">
    //                                     <div className="flex items-center gap-3">
    //                                         <div className="p-2 bg-slate-100 rounded-lg"><Activity className="text-slate-600" size={18} /></div>
    //                                         <span className="font-bold text-slate-700 uppercase text-xs tracking-wider">Tabaquismo</span>
    //                                     </div>
    //                                     <label className="relative inline-flex items-center cursor-pointer">
    //                                         <input type="checkbox" className="sr-only peer" checked={formData.personalQuestions.Smokes} onChange={e => updateNestedField('personalQuestions', 'Smokes', e.target.checked)} />
    //                                         <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    //                                     </label>
    //                                 </div>
    //                                 {formData.personalQuestions.Smokes && (
    //                                     <input type="number" placeholder="Años de consumo" className={inputStyle} value={formData.personalQuestions.SmokingYears} onChange={e => updateNestedField('personalQuestions', 'SmokingYears', parseInt(e.target.value) || 0)} />
    //                                 )}
    //                             </div>

    //                             <div className={cardStyle}>
    //                                 <div className="flex items-center justify-between mb-4">
    //                                     <div className="flex items-center gap-3">
    //                                         <div className="p-2 bg-slate-100 rounded-lg"><Activity className="text-slate-600" size={18} /></div>
    //                                         <span className="font-bold text-slate-700 uppercase text-xs tracking-wider">Alcoholismo</span>
    //                                     </div>
    //                                     <label className="relative inline-flex items-center cursor-pointer">
    //                                         <input type="checkbox" className="sr-only peer" checked={formData.personalQuestions.DrinksAlcohol} onChange={e => updateNestedField('personalQuestions', 'DrinksAlcohol', e.target.checked)} />
    //                                         <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    //                                     </label>
    //                                 </div>
    //                                 {formData.personalQuestions.DrinksAlcohol && (
    //                                     <input type="text" placeholder="Frecuencia / Descripción" className={inputStyle} value={formData.personalQuestions.AlcoholDescription} onChange={e => updateNestedField('personalQuestions', 'AlcoholDescription', e.target.value)} />
    //                                 )}
    //                             </div>

    //                             <div className={cardStyle}>
    //                                 <div className="flex items-center justify-between mb-4">
    //                                     <div className="flex items-center gap-3">
    //                                         <div className="p-2 bg-slate-100 rounded-lg"><Activity className="text-slate-600" size={18} /></div>
    //                                         <span className="font-bold text-slate-700 uppercase text-xs tracking-wider">Bruxismo</span>
    //                                     </div>
    //                                     <label className="relative inline-flex items-center cursor-pointer">
    //                                         <input type="checkbox" className="sr-only peer" checked={formData.personalQuestions.Bruxism} onChange={e => updateNestedField('personalQuestions', 'Bruxism', e.target.checked)} />
    //                                         <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    //                                     </label>
    //                                 </div>
    //                                 {formData.personalQuestions.Bruxism && (
    //                                     <input type="text" placeholder="Detalles (Nocturno/Diurno)" className={inputStyle} value={formData.personalQuestions.BruxismDescription} onChange={e => updateNestedField('personalQuestions', 'BruxismDescription', e.target.value)} />
    //                                 )}
    //                             </div>

    //                             <div className={cardStyle}>
    //                                 <div className="flex items-center justify-between mb-4">
    //                                     <div className="flex items-center gap-3">
    //                                         <div className="p-2 bg-slate-100 rounded-lg"><Activity className="text-slate-600" size={18} /></div>
    //                                         <span className="font-bold text-slate-700 uppercase text-xs tracking-wider">Hábito de Coqueo</span>
    //                                     </div>
    //                                     <label className="relative inline-flex items-center cursor-pointer">
    //                                         <input type="checkbox" className="sr-only peer" checked={formData.personalQuestions.ChewsCoca} onChange={e => updateNestedField('personalQuestions', 'ChewsCoca', e.target.checked)} />
    //                                         <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    //                                     </label>
    //                                 </div>
    //                                 {formData.personalQuestions.ChewsCoca && (
    //                                     <input type="text" placeholder="Frecuencia" className={inputStyle} value={formData.personalQuestions.CocaDescription} onChange={e => updateNestedField('personalQuestions', 'CocaDescription', e.target.value)} />
    //                                 )}
    //                             </div>
    //                         </div>
    //                     </div>
    //                 )}

    //                 {/* PASO 3: Patológicos */}
    //                 {step === 3 && (
    //                     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
    //                         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
    //                             {[
    //                                 { id: 'Anemia', label: 'Anemia' },
    //                                 { id: 'Diabetes', label: 'Diabetes' },
    //                                 { id: 'HeartDisease', label: 'Cardiopatías' },
    //                                 { id: 'Hypertension', label: 'Hipertensión' },
    //                                 { id: 'TakingMedication', label: 'Medicación' },
    //                                 { id: 'Allergies', label: 'Alergias' },
    //                             ].map(item => (
    //                                 <button
    //                                     key={item.id}
    //                                     type="button"
    //                                     onClick={() => updateNestedField('pathologicalQuestions', item.id, !formData.pathologicalQuestions[item.id])}
    //                                     className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 active:scale-95 ${formData.pathologicalQuestions[item.id]
    //                                         ? 'bg-red-50 border-red-200 text-red-700 shadow-sm shadow-red-100'
    //                                         : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
    //                                         }`}
    //                                 >
    //                                     <div className={`w-3 h-3 rounded-full ${formData.pathologicalQuestions[item.id] ? 'bg-red-500 animate-pulse' : 'bg-slate-100'}`} />
    //                                     <span className="text-[11px] font-black uppercase tracking-tighter">{item.label}</span>
    //                                 </button>
    //                             ))}
    //                         </div>

    //                         <div className="space-y-6 pt-4 border-t border-slate-100">
    //                             {formData.pathologicalQuestions.Allergies && (
    //                                 <div className="animate-in zoom-in-95">
    //                                     <label className={labelStyle}>Descripción detallada de Alergias</label>
    //                                     <textarea
    //                                         className={`${inputStyle} h-24 resize-none`}
    //                                         value={formData.pathologicalQuestions.AllergiesDescription}
    //                                         onChange={e => updateNestedField('pathologicalQuestions', 'AllergiesDescription', e.target.value)}
    //                                         placeholder="Mencione medicamentos, alimentos o anestésicos..."
    //                                     />
    //                                 </div>
    //                             )}
    //                             <div>
    //                                 <label className={labelStyle}>Otras Enfermedades o Condiciones Crónicas</label>
    //                                 <textarea
    //                                     className={`${inputStyle} h-32 resize-none`}
    //                                     value={formData.pathologicalQuestions.OtherConditions}
    //                                     onChange={e => updateNestedField('pathologicalQuestions', 'OtherConditions', e.target.value)}
    //                                     placeholder="Describa cualquier condición no mencionada anteriormente..."
    //                                 />
    //                             </div>
    //                         </div>
    //                     </div>
    //                 )}

    //                 {/* PASO 4: Mujeres */}
    //                 {step === 4 && isFemale && (
    //                     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    //                         <div className="bg-pink-50 border border-pink-100 rounded-3xl p-8 space-y-8">
    //                             <div className="flex items-start justify-between">
    //                                 <div className="flex items-center gap-4">
    //                                     <div className="p-3 bg-pink-500 text-white rounded-2xl shadow-lg shadow-pink-200"><Baby size={24} /></div>
    //                                     <div>
    //                                         <h3 className="text-xl font-bold text-pink-900">Gineco-Obstetricia</h3>
    //                                         <p className="text-pink-600 text-sm">Información vital para seguridad en tratamientos.</p>
    //                                     </div>
    //                                 </div>
    //                                 <label className="relative inline-flex items-center cursor-pointer scale-125 mr-2 mt-2">
    //                                     <input type="checkbox" className="sr-only peer" checked={formData.womenQuestions.IsPregnant} onChange={e => updateNestedField('womenQuestions', 'IsPregnant', e.target.checked)} />
    //                                     <div className="w-11 h-6 bg-pink-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-pink-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
    //                                 </label>
    //                             </div>

    //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    //                                 <div className={formData.womenQuestions.IsPregnant ? 'opacity-100 transition-opacity' : 'opacity-40 pointer-events-none grayscale'}>
    //                                     <label className="block text-xs font-bold text-pink-700 uppercase tracking-widest mb-2">Meses de Gestación</label>
    //                                     <input
    //                                         type="number"
    //                                         min="0" max="9"
    //                                         className="w-full px-5 py-3 bg-white border border-pink-200 rounded-2xl outline-none focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 text-pink-900 font-bold"
    //                                         value={formData.womenQuestions.PregnancyTimeMonth}
    //                                         onChange={e => updateNestedField('womenQuestions', 'PregnancyTimeMonth', parseInt(e.target.value) || 0)}
    //                                     />
    //                                 </div>
    //                                 <div>
    //                                     <label className="block text-xs font-bold text-pink-700 uppercase tracking-widest mb-2">Última Menstruación (FUM)</label>
    //                                     <input
    //                                         type="date"
    //                                         className="w-full px-5 py-3 bg-white border border-pink-200 rounded-2xl outline-none focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 text-pink-900 font-bold"
    //                                         value={formData.womenQuestions.LastMenstruationDate}
    //                                         onChange={e => updateNestedField('womenQuestions', 'LastMenstruationDate', e.target.value)}
    //                                     />
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 )}
    //             </div>

    //             {/* Bottom Navigation */}
    //             <div className="bg-slate-50 border-t border-slate-100 p-6 flex items-center justify-between">
    //                 <div className="w-[30%]">
    //                     {!(step === 1) && (
    //                         <ButtonGeneric
    //                             variant="before"
    //                             className="w-full"
    //                             onClick={() => setStep(s => s - 1)}
    //                         >
    //                             <ChevronLeft size={20} />
    //                             Anterior
    //                         </ButtonGeneric>
    //                     )}
    //                 </div>
    //                 <div className="w-[30%]">
    //                     {step < totalSteps ? (
    //                         <ButtonGeneric
    //                             variant="primary"
    //                             className="w-full"
    //                             onClick={() => setStep(s => s + 1)}
    //                         >
    //                             Siguiente
    //                             <ChevronRight size={20} />
    //                         </ButtonGeneric>
    //                     ) : (
    //                         <ButtonGeneric
    //                             variant="primary"
    //                             className="w-full gap-2"
    //                             onClick={onSaveInternal}
    //                         >
    //                             Finalizar Registro
    //                             <CheckCircle2 size={20} />
    //                         </ButtonGeneric>
    //                     )}
    //                 </div>
    //             </div>
    //         </div>
    //     </div >
    // );
}

export default UserForm