import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
    Camera,
    Upload,
    UserPlus,
    CheckCircle2,
    ChevronRight,
    Search,
    Filter,
    MoreVertical,
    Trash2,
    Users,
    Loader2,
    XCircle,
    AlertCircle,
    ArrowLeft
} from 'lucide-react';
import ButtonGeneric from '@/components/Common/Button/ButtonGeneric';

const UserTable = ({ patients, onAddNew }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPatients = useMemo(() => {
        return patients.filter(p =>
            `${p.Name} ${p.FirstSurname}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [patients, searchTerm]);

    return (
        <div className="flex flex-col h-full animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-center w-full">
                <ButtonGeneric
                    variant="primary"
                    onClick={onAddNew}
                >
                    Nuevo Usuario
                </ButtonGeneric>
                <div className="relative w-full md:flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o apellido..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Filtros y Buscador */}
            {/* <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o apellido..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-3 text-slate-600 font-semibold hover:bg-slate-50 rounded-2xl transition-colors text-sm">
                    <Filter size={16} />
                    Filtros
                </button>
            </div> */}

            {/* Contenedor de Tabla */}
            <div className="bg-white rounded-lg border border-slate-100 shadow-xl shadow-slate-200/50 flex-1 overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-odont-primary text-odont-skyblue">
                            <tr className="border-b border-slate-50">
                                <th className="px-2 py-2 text-xs font-black  tracking-widest">Nombre</th>
                                <th className="px-2 py-2 text-xs font-black  tracking-widest hidden md:table-cell">ID Registro</th>
                                <th className="px-2 py-2 text-xs font-black  tracking-widest">Sexo</th>
                                <th className="px-2 py-2 text-xs font-black  tracking-widest hidden lg:table-cell">Fecha Alta</th>
                                <th className="px-2 py-2 text-xs font-black  tracking-widest text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredPatients.length > 0 ? filteredPatients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-2 ">
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                                                {patient.Image ? (
                                                    <img src={patient.Image} className="w-full h-full object-cover" alt="Profile" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-400 uppercase font-bold text-xs">
                                                        {patient.Name[0]}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-700">{patient.Name} {patient.FirstSurname}</div>
                                                <div className="text-xs text-slate-400 truncate max-w-[150px]">{patient.SecondSurname || 'Sin segundo apellido'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <code className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-mono">
                                            {patient.id.split('-')[0].toUpperCase()}
                                        </code>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${patient.Sexo === 'Masculino' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
                                            {patient.Sexo}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500 hidden lg:table-cell">
                                        {new Date(patient.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                                                <Users size={32} />
                                            </div>
                                            <p className="text-slate-400 font-medium">No se encontraron pacientes registrados.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserTable