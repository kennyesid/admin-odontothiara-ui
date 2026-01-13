import React from "react";
import { motion } from "framer-motion";
import {
    Home,
    User,
    Search,
    CalendarDays,
    ArrowLeftRight,
    UserPlus,
    Settings,
    LogOut
} from "lucide-react";

const NavItem = ({ Icon, label, isActive, path }) => {
    return (
        <motion.a
            href={path}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
            className={`
        relative flex items-center p-3 my-1.5 rounded-2xl transition-all duration-300 w-full cursor-pointer group
        ${isActive
                    ? "bg-[#19D1E6] text-white shadow-lg "
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                }
      `}
            style={{ textDecoration: 'none' }}
        >
            <div className="mr-3">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>

            <span className={`text-[14px] ${isActive ? "font-bold" : "font-medium"}`}>
                {label}
            </span>

            {isActive && (
                <motion.div
                    layoutId="active-indicator"
                    className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full"
                />
            )}
        </motion.a>
    );
};

const NavBar2026 = () => {
    const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";

    const navItems = [
        { path: "/", label: "Dashboard", icon: Home },
        { path: "/createUser", label: "Usuario", icon: UserPlus },
        { path: "/visit", label: "Visita Médica", icon: ArrowLeftRight },
        { path: "/patients", label: "Pacientes", icon: User },
        { path: "/history", label: "Historial", icon: Search },
        { path: "/calendar", label: "Citas", icon: CalendarDays },
    ];

    return (
        /* Contenedor envolvente para simular el fondo de la app y el margen del navbar */
        <>
            {/* Navbar como "Card" Flotante */}
            <aside className="w-[20%] h-full bg-white rounded-3xl shadow-xl  flex flex-col p-6 border border-white">

                {/* Logo / Header */}
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
                        <div className="w-4 h-4 bg-lime-400 rounded-sm rotate-45" />
                    </div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">
                        Dental<span className="text-lime-500 text-2xl">.</span>
                    </h1>
                </div>

                {/* Navegación */}
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 px-4">
                    General
                </div>

                <nav className="flex-grow space-y-1 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.path}
                            Icon={item.icon}
                            label={item.label}
                            path={item.path}
                            isActive={currentPath === item.path}
                        />
                    ))}
                </nav>

                {/* Footer del Navbar */}
                <div className="mt-auto space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 px-4">
                        Sistema
                    </div>

                    <NavItem
                        Icon={Settings}
                        label="Configuración"
                        path="/settings"
                        isActive={currentPath === "/settings"}
                    />

                    <button className="flex items-center p-3.5 w-full text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all group">
                        <LogOut size={20} className="mr-3 transition-transform group-hover:-translate-x-1" />
                        <span className="text-[14px] font-medium">Salir</span>
                    </button>

                    {/* User Info Card Inside Navbar */}
                    <div className="mt-6 p-4 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center text-lime-700 font-bold text-sm">
                            DR
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold text-slate-800 truncate">Dr. Rodríguez</p>
                            <p className="text-[10px] text-slate-500 truncate">Administrador</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Espacio para el contenido principal (Main Content Area) */}
            {/* <main className="flex-grow ml-4 overflow-y-auto">
            </main> */}
        </>
    );
};

export default NavBar2026;