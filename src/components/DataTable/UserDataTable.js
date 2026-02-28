import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
    ChevronRight,
    Search,
    Trash2,
    Users,
    Edit2,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    ChevronLeft
} from 'lucide-react';
import { STYLE_INTERNAL } from '@/styles/styleInternal';

const UserDataTable = ({ patients, onAddNew, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredPatients = useMemo(() => {
        return patients.filter(p =>
            `${p.Name} ${p.FirstSurname}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [patients, searchTerm]);

    // PRUEBA PAGINACION
    const sortedPatients = useMemo(() => {
        let sortableItems = [...filteredPatients];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                let aValue = a[sortConfig.key] ?? "";
                let bValue = b[sortConfig.key] ?? "";

                // Si son strings, convertimos a minúsculas para comparar correctamente
                if (typeof aValue === 'string') aValue = aValue.toLowerCase();
                if (typeof bValue === 'string') bValue = bValue.toLowerCase();

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [filteredPatients, sortConfig]);

    // 3. PAGINACIÓN: Segmentación del array final
    const totalPages = Math.ceil(sortedPatients.length / itemsPerPage);
    const currentData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return sortedPatients.slice(start, start + itemsPerPage);
    }, [sortedPatients, currentPage]);

    // Handlers
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <ArrowUpDown size={14} className="ml-1 opacity-50" />;
        return sortConfig.direction === 'asc' ?
            <ArrowUp size={14} className="ml-1 text-blue-500" /> :
            <ArrowDown size={14} className="ml-1 text-blue-500" />;
    };
    // FIN PRUEBA PAGINACION

    if (patients.length === 0) {
        return (
            <div><h1>No hay datos</h1></div>
        )
    }
    return (
        <div className="flex flex-col h-full animate-in fade-in duration-500">
            {/* Barra de búsqueda */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-center w-full">
                <div className="relative w-full md:flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o apellido..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm text-slate-700"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            </div>

            {/* Contenedor de Tabla */}
            <div className="bg-white rounded-lg border border-slate-100 shadow-xl shadow-slate-200/50 flex-1 overflow-hidden flex flex-col">
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead className={` ${STYLE_INTERNAL.onlyPrimary} sticky top-0 z-10 `}>
                            <tr>
                                <th
                                    className="w-[44%] px-4 py-3 text-xs font-black tracking-widest cursor-pointer transition-colors "
                                    onClick={() => requestSort('Name')}
                                >
                                    <div className="flex items-center">Nombre {getSortIcon('Name')}</div>
                                </th>
                                <th
                                    className="w-[10%] px-4 py-3 text-xs font-black tracking-widest cursor-pointer "
                                    onClick={() => requestSort('Sexo')}
                                >
                                    <div className="flex items-center">Sexo {getSortIcon('Sexo')}</div>
                                </th>
                                <th
                                    className="w-[12%] px-4 py-3 text-xs font-black tracking-widest cursor-pointer "
                                    onClick={() => requestSort('Phone')}
                                >
                                    <div className="flex items-center">Telefono {getSortIcon('Phone')}</div>
                                </th>
                                <th
                                    className="w-[10%] px-4 py-3 text-xs font-black tracking-widest cursor-pointer "
                                    onClick={() => requestSort('Email')}
                                >
                                    <div className="flex items-center">Correo {getSortIcon('Email')}</div>
                                </th>
                                <th
                                    className="w-[12%] px-4 py-3 text-xs font-black tracking-widest hidden lg:table-cell cursor-pointer "
                                    onClick={() => requestSort('createdAt')}
                                >
                                    <div className="flex items-center">Fecha Alta {getSortIcon('createdAt')}</div>
                                </th>
                                <th className="w-[8%] px-4 py-3 text-xs font-black tracking-widest text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {currentData.length > 0 ? currentData.map((patient) => (
                                <tr key={patient.id || Math.random()} className="hover:bg-slate-50/50 transition-colors group">
                                    {/* <td className="px-4 py-2 hidden md:table-cell">
                                        <code className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-mono">
                                            {patient?.id ? patient.id.substring(0, 8).toUpperCase() : 'N/A'}
                                        </code>
                                    </td> */}
                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                                                {patient?.Image ? (
                                                    <img src={patient.Image} className="w-full h-full object-cover" alt="Profile" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-400 uppercase font-bold text-xs">
                                                        {(patient?.Name?.[0]) || '?'}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-700">
                                                    {patient?.Name || 'N/A'} {patient?.FirstSurname || ''}
                                                </div>
                                                <div className="text-[11px] text-slate-400 truncate max-w-[150px]">
                                                    {patient?.Occupation || 'Sin ocupación'}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-black tracking-tighter border shadow-sm ${patient.Sexo === 'Masculino'
                                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                            : 'bg-purple-50 text-purple-700 border-purple-600'
                                            }`}>
                                            {/* <div className={`w-2 h-2 rounded-full animate-pulse ${patient.Sexo === 'Masculino' ? 'bg-indigo-500' : 'bg-purple-500'}`}></div> */}
                                            {patient.Sexo}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-slate-500 hidden lg:table-cell">
                                        {patient?.Phone || 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-slate-500 hidden lg:table-cell">
                                        {patient?.Email || 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-slate-500 hidden lg:table-cell">
                                        {patient?.createdAt ? new Date(patient.createdAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        <div className="flex justify-end ">
                                            <button
                                                onClick={() => onEdit && onEdit(patient)}
                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                title="Editar"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => onDelete && onDelete(patient)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                title="Eliminar"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                                                <Users size={32} />
                                            </div>
                                            <p className="text-slate-400 font-medium">No hay registros que coincidan.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer con Paginación */}
                {totalPages > 0 && (
                    <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <div className="text-xs text-slate-500">
                            Mostrando <span className="font-bold text-slate-700">{currentData.length}</span> de <span className="font-bold text-slate-700">{sortedPatients.length}</span> pacientes
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
                            >
                                <ChevronLeft size={16} />
                            </button>

                            <div className="flex items-center gap-1 hidden sm:flex">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentPage === i + 1
                                            ? STYLE_INTERNAL.onlyPrimary + 'shadow-lg shadow-blue-200 '
                                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}

export default UserDataTable