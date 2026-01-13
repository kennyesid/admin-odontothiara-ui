import React, { useState, useEffect } from 'react';
import {
  User, Heart, Baby, ChevronRight, ChevronLeft, Save,
  Calendar, Phone, CreditCard, CheckCircle2, Stethoscope,
  MapPin, Briefcase, Users, Mail, Activity, AlertCircle,
  Thermometer, ClipboardList
} from 'lucide-react';
import PatientRegistration from '@/models/dtos/CreateUser/PatientRegistration';
import parameterService from '@/services/generics/ParameterService';

const PatientForm = ({ formData, setFormData, paramLevelSection }) => {
  const [step, setStep] = useState(paramLevelSection);
  const [roles, setRoles] = useState([]);
  // const [formDataa, setFormDataa] = useState({
  //   // PatientRegistration (User Table)
  //   RolId: 2,
  //   Name: '',
  //   FirstSurname: '',
  //   SecondSurname: '',
  //   Age: 0,
  //   Sexo: 'S/N',
  //   BirthDate: new Date().toISOString().split('T')[0],
  //   PlaceOfBirth: '',
  //   Occupation: '',
  //   MaritalStatus: 'S/N',
  //   Address: '',
  //   IdentityCard: '',
  //   Email: '',
  //   Phone: '',
  //   State: true,

  //   // QuestionPersonal
  //   personalQuestions: {
  //     Smokes: false,
  //     SmokingYears: 0,
  //     DrinksAlcohol: false,
  //     AlcoholDescription: '',
  //     Bruxism: false,
  //     BruxismDescription: '',
  //     ChewsCoca: false,
  //     CocaDescription: '',
  //     State: true
  //   },

  //   // QuestionPathological
  //   pathologicalQuestions: {
  //     Anemia: false,
  //     Diabetes: false,
  //     HeartDisease: false,
  //     Allergies: false,
  //     AllergiesDescription: '',
  //     TakingMedication: false,
  //     Hypertension: false,
  //     OtherConditions: ''
  //   },

  //   // QuestionWomen
  //   womenQuestions: {
  //     IsPregnant: false,
  //     PregnancyTimeMonth: 0,
  //     LastMenstruationDate: new Date().toISOString().split('T')[0],
  //     State: true
  //   }
  // });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roles = await parameterService.getRols();
        setRoles(roles);
      } catch (error) {
        console.error('Error al cargar roles:', error);
      } finally {
        // setLoading(false);
        const asdasd = "";
      }
    };
    fetchRoles();
    const hh = "asd";
  }, [])

  useEffect(() => {
    if (paramLevelSection) setStep(Number(paramLevelSection));
  }, [paramLevelSection]);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  // Lógica de pasos dinámicos
  const isFemale = formData.Sexo === 'Femenino';
  const totalSteps = isFemale ? 4 : 3;

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const inputStyle = "w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm";
  const labelStyle = "block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-tight";
  const cardStyle = "p-4 rounded-xl border border-slate-100 bg-slate-50/30 transition-all hover:bg-slate-50";

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      {/* Header / Stepper */}
      <div className="px-6  flex items-center justify-between">
        <div className="text-right">

          <div className="flex items-center gap-2">
            {step === 1 && (
              <>
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><User size={20} /></div>
                <h3 className="text-lg font-bold text-slate-800">Información de Identidad</h3>
              </>
            )}
            {step === 2 && (
              <>
                <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><Activity size={20} /></div>
                <h3 className="text-lg font-bold text-slate-800">Hábitos y Estilo de Vida</h3>
              </>
            )}
            {step === 3 && (
              <>
                <div className="p-2 bg-red-100 rounded-lg text-red-600"><Thermometer size={20} /></div>
                <h3 className="text-lg font-bold text-slate-800">Antecedentes Patológicos</h3>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((num) => (
            num <= totalSteps && (
              <React.Fragment key={num}>
                <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all ${step === num ? 'bg-blue-600 text-white' :
                  step > num ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'
                  }`}>
                  {step > num ? <CheckCircle2 size={14} /> : num}
                </div>
                {num < totalSteps && <div className="w-4 h-px bg-slate-300" />}
              </React.Fragment>
            )
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">
        {/* PASO 1: PatientRegistration */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className={labelStyle}>Nombres *</label>
                <input type="text" className={inputStyle} value={formData.Name} onChange={e => updateField('Name', e.target.value)} placeholder="Ej. Juan Pablo" />
              </div>
              <div>
                <label className={labelStyle}>Apellido Paterno *</label>
                <input type="text" className={inputStyle} value={formData.FirstSurname} onChange={e => updateField('FirstSurname', e.target.value)} />
              </div>
              <div>
                <label className={labelStyle}>Apellido Materno</label>
                <input type="text" className={inputStyle} value={formData.SecondSurname} onChange={e => updateField('SecondSurname', e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className={labelStyle}>Rol</label>
                <select
                  className={`${inputStyle}`}
                  value={formData.RolId}
                  onChange={e => updateField('RolId', parseInt(e.target.value))}
                >
                  {roles.map((rol) => (
                    <option key={rol.id} value={rol.id}>
                      {rol.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelStyle}>Género</label>
                <select className={inputStyle} value={formData.Sexo} onChange={e => updateField('Sexo', e.target.value)}>
                  <option value="S/N">Seleccionar...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
              <div>
                <label className={labelStyle}>Fecha Nacimiento</label>
                <input type="date" className={inputStyle} value={formData.BirthDate} onChange={e => updateField('BirthDate', e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className={labelStyle}>Cédula de Identidad</label>
                <input type="text" className={inputStyle} value={formData.IdentityCard} onChange={e => updateField('IdentityCard', e.target.value)} />
              </div>
              <div>
                <label className={labelStyle}>Lugar de Nacimiento</label>
                <input type="text" className={inputStyle} value={formData.PlaceOfBirth} onChange={e => updateField('PlaceOfBirth', e.target.value)} />
              </div>
              <div>
                <label className={labelStyle}>Ocupación</label>
                <input type="text" className={inputStyle} value={formData.Occupation} onChange={e => updateField('Occupation', e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className={labelStyle}>Estado Civil</label>
                <select className={inputStyle} value={formData.MaritalStatus} onChange={e => updateField('MaritalStatus', e.target.value)}>
                  <option value="S/N">Seleccionar...</option>
                  <option value="Soltero/a">Soltero/a</option>
                  <option value="Casado/a">Casado/a</option>
                  <option value="Divorciado/a">Divorciado/a</option>
                  <option value="Viudo/a">Viudo/a</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={labelStyle}>Dirección de Domicilio</label>
                <input type="text" className={inputStyle} value={formData.Address} onChange={e => updateField('Address', e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className={labelStyle}>Teléfono / Celular</label>
                <input type="text" className={inputStyle} value={formData.Phone} onChange={e => updateField('Phone', e.target.value)} />
              </div>
              <div>
                <label className={labelStyle}>Correo Electrónico</label>
                <input type="email" className={inputStyle} value={formData.Email} onChange={e => updateField('Email', e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* PASO 2: QuestionPersonal */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={cardStyle}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-700">Tabaquismo</span>
                  <input type="checkbox" className="w-5 h-5 accent-blue-600" checked={formData.personalQuestions.Smokes} onChange={e => updateNestedField('personalQuestions', 'Smokes', e.target.checked)} />
                </div>
                {formData.personalQuestions.Smokes && (
                  <input type="number" placeholder="Años de consumo" className={inputStyle} value={formData.personalQuestions.SmokingYears} onChange={e => updateNestedField('personalQuestions', 'SmokingYears', parseInt(e.target.value) || 0)} />
                )}
              </div>

              <div className={cardStyle}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-700">Alcoholismo</span>
                  <input type="checkbox" className="w-5 h-5 accent-blue-600" checked={formData.personalQuestions.DrinksAlcohol} onChange={e => updateNestedField('personalQuestions', 'DrinksAlcohol', e.target.checked)} />
                </div>
                {formData.personalQuestions.DrinksAlcohol && (
                  <input type="text" placeholder="Frecuencia / Descripción" className={inputStyle} value={formData.personalQuestions.AlcoholDescription} onChange={e => updateNestedField('personalQuestions', 'AlcoholDescription', e.target.value)} />
                )}
              </div>

              <div className={cardStyle}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-700">Bruxismo</span>
                  <input type="checkbox" className="w-5 h-5 accent-blue-600" checked={formData.personalQuestions.Bruxism} onChange={e => updateNestedField('personalQuestions', 'Bruxism', e.target.checked)} />
                </div>
                {formData.personalQuestions.Bruxism && (
                  <input type="text" placeholder="Detalles (Nocturno/Diurno)" className={inputStyle} value={formData.personalQuestions.BruxismDescription} onChange={e => updateNestedField('personalQuestions', 'BruxismDescription', e.target.value)} />
                )}
              </div>

              <div className={cardStyle}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-700">Hábito de Coqueo</span>
                  <input type="checkbox" className="w-5 h-5 accent-blue-600" checked={formData.personalQuestions.ChewsCoca} onChange={e => updateNestedField('personalQuestions', 'ChewsCoca', e.target.checked)} />
                </div>
                {formData.personalQuestions.ChewsCoca && (
                  <input type="text" placeholder="Frecuencia" className={inputStyle} value={formData.personalQuestions.CocaDescription} onChange={e => updateNestedField('personalQuestions', 'CocaDescription', e.target.value)} />
                )}
              </div>
            </div>
          </div>
        )}

        {/* PASO 3: QuestionPathological */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { id: 'Anemia', label: 'Anemia' },
                { id: 'Diabetes', label: 'Diabetes' },
                { id: 'HeartDisease', label: 'Cardiopatías' },
                { id: 'Hypertension', label: 'Hipertensión' },
                { id: 'TakingMedication', label: 'Medicación Actual' },
                { id: 'Allergies', label: 'Alergias' },
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => updateNestedField('pathologicalQuestions', item.id, !formData.pathologicalQuestions[item.id])}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-2 ${formData.pathologicalQuestions[item.id]
                    ? 'bg-red-50 border-red-200 text-red-700 shadow-sm'
                    : 'bg-white border-slate-100 text-slate-500'
                    }`}
                >
                  <div className={`w-2 h-2 rounded-full ${formData.pathologicalQuestions[item.id] ? 'bg-red-500 animate-pulse' : 'bg-slate-200'}`} />
                  {item.label}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {formData.pathologicalQuestions.Allergies && (
                <div className="animate-in slide-in-from-top-2">
                  <label className={labelStyle}>Descripción de Alergias</label>
                  <textarea
                    className={inputStyle}
                    rows="2"
                    value={formData.pathologicalQuestions.AllergiesDescription}
                    onChange={e => updateNestedField('pathologicalQuestions', 'AllergiesDescription', e.target.value)}
                    placeholder="Especifique medicamentos, alimentos o sustancias..."
                  />
                </div>
              )}
              <div>
                <label className={labelStyle}>Otras Enfermedades o Condiciones</label>
                <textarea
                  className={inputStyle}
                  rows="3"
                  value={formData.pathologicalQuestions.OtherConditions}
                  onChange={e => updateNestedField('pathologicalQuestions', 'OtherConditions', e.target.value)}
                  placeholder="Describa cualquier otra condición médica relevante..."
                />
              </div>
            </div>
          </div>
        )}

        {/* PASO 4: QuestionWomen */}
        {step === 4 && isFemale && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-pink-100 rounded-lg text-pink-600"><Baby size={20} /></div>
              <h3 className="text-lg font-bold text-slate-800">Gineco-Obstetricia</h3>
            </div>

            <div className="bg-pink-50/30 border border-pink-100 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-pink-100">
                <div>
                  <p className="font-bold text-slate-800">¿Se encuentra embarazada actualmente?</p>
                  <p className="text-xs text-slate-500">Información crítica para procedimientos odontológicos</p>
                </div>
                <input
                  type="checkbox"
                  className="w-6 h-6 accent-pink-500"
                  checked={formData.womenQuestions.IsPregnant}
                  onChange={e => updateNestedField('womenQuestions', 'IsPregnant', e.target.checked)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={formData.womenQuestions.IsPregnant ? 'opacity-100' : 'opacity-50 pointer-events-none'}>
                  <label className={labelStyle}>Meses de Gestación</label>
                  <input
                    type="number"
                    min="0" max="9"
                    className={inputStyle}
                    value={formData.womenQuestions.PregnancyTimeMonth}
                    onChange={e => updateNestedField('womenQuestions', 'PregnancyTimeMonth', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className={labelStyle}>Fecha de Última Menstruación (FUM)</label>
                  <input
                    type="date"
                    className={inputStyle}
                    value={formData.womenQuestions.LastMenstruationDate}
                    onChange={e => updateNestedField('womenQuestions', 'LastMenstruationDate', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientForm