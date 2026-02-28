import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Home,
    User,
    Search,
    CalendarDays,
    ArrowLeftRight,
    UserPlus,
    Settings,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { STYLE_ROOT } from "@/styles/styleGeneric";
import { STYLE_INTERNAL } from "@/styles/styleInternal";

const NavItem = ({ Icon, label, isActive, path }) => {
    return (
        <motion.a
            href={path}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
            className={`
        relative flex items-center p-3 my-1.5 rounded-2xl transition-all duration-300 w-full cursor-pointer group
        ${isActive
                    ? "shadow-lg " + STYLE_ROOT.navbarButton
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

    const [isOpen, setIsOpen] = useState(false);
    const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";

    const navItems = [
        { path: "/", label: "Dashboard", icon: Home },
        { path: "/createUser", label: "Usuario", icon: UserPlus },
        { path: "/visit", label: "Visita Médica", icon: ArrowLeftRight },
        { path: "/history", label: "Historial", icon: Search },
        { path: "/calendar", label: "Citas", icon: CalendarDays },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    const SidebarContent = () => (
        <>
            {/* Logo / Header */}
            <div className="flex items-center justify-between mb-12 px-2">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
                        <div className="w-4 h-4 bg-lime-400 rounded-sm rotate-45" />
                    </div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">
                        Dental<span className="text-lime-500 text-2xl">.</span>
                    </h1>
                </div>
                {/* Botón cerrar solo visible en móvil dentro del menú */}
                <button onClick={toggleMenu} className="md:hidden p-2 text-slate-500">
                    <X size={24} />
                </button>
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
                        onClick={() => setIsOpen(false)}
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
                    onClick={() => setIsOpen(false)}
                />

                <button className="flex items-center p-3.5 w-full text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all group">
                    <LogOut size={20} className="mr-3 transition-transform group-hover:-translate-x-1" />
                    <span className="text-[14px] font-medium">Salir</span>
                </button>

                <div className="mt-6 p-4 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center text-lime-700 font-bold text-sm">
                        DR
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-xs font-bold text-slate-800 truncate">Dr. Sacaca</p>
                        <p className="text-[10px] text-slate-500 truncate">Administrador</p>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        /* Contenedor envolvente para simular el fondo de la app y el margen del navbar */
        <>
            {/* BOTÓN HAMBURGUESA (Solo móvil) */}
            <div className="md:hidden fixed top-4 right-4 z-[60]">
                {/* STYLE_INTERNAL */}
                {/* bg-white hover:bg-slate-50 */}
                <button
                    onClick={toggleMenu}
                    className={`p-3 shadow-lg border border-slate-100 rounded-2xl text-[#052a3d] transition-colors ${STYLE_ROOT.primary}`}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* OVERLAY (Fondo oscuro al abrir en móvil) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleMenu}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* NAVBAR DESKTOP (Siempre visible en md+) */}
            <aside className={`hidden md:flex md:w-64 lg:w-[20%] h-full flex-col p-6 bg-white shadow-xl border border-white ${STYLE_ROOT.roundedPanelMain}`}>
                <SidebarContent />
            </aside>

            {/* NAVBAR MÓVIL (Animado) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className={`fixed top-0 left-0 bottom-0 w-[280px] z-50 flex flex-col p-6 bg-white shadow-2xl border-r border-slate-100 md:hidden`}
                    >
                        <SidebarContent />
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
};

export default NavBar2026;