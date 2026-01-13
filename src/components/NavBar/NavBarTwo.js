import React from "react";
import { motion } from "framer-motion";
import { Home, User, Search, CalendarDays, ArrowLeftRight, UserPlus } from "lucide-react";

const NavItem = ({ Icon, label, isActive, path }) => {
  const className = `
    flex items-center p-3 rounded-xl transition-all duration-200 w-full cursor-pointer
    ${isActive
      ? "bg-white text-cyan-600 shadow-lg font-bold"
      : "text-sky-100 hover:bg-cyan-500 hover:text-white font-medium"
    }
  `;

  return (
    <a href={path} className={className} style={{ textDecoration: 'none' }}>
      <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
      <span className="text-base truncate">{label}</span>
    </a>
  );
};

const NavBarTwo = () => {
  // Obtenemos la ruta actual de forma segura usando window.location
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
    <div className="w-full h-screen sticky top-0 left-0 bg-gradient-to-br from-sky-500 to-cyan-600 text-white p-6 shadow-2xl z-20 hidden md:flex flex-col overflow-hidden">
      {/* Título de la Aplicación */}
      <motion.div
        className="flex items-center mb-10 pb-4 border-b border-white/40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-extrabold tracking-wider">
          Dental<span className="text-cyan-200">Pro</span>
        </h1>
      </motion.div>

      {/* Elementos de Navegación Principal */}
      <nav className="flex-grow space-y-3 overflow-y-auto custom-scrollbar">
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

      {/* Pie de página del Navbar */}
      <div className="pt-6 border-t border-white/20 mt-auto">
        <div className="flex flex-col items-center opacity-70">
          <p className="text-[10px] text-cyan-100 font-bold uppercase tracking-widest text-center">
            DentalPro Management
          </p>
          <p className="text-[9px] text-cyan-200">v1.0.2</p>
        </div>
      </div>
    </div>
  );
};

export default NavBarTwo;
