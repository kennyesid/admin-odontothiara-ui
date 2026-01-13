import React from 'react';  
import { motion } from 'framer-motion';  
import { Home, User, Search, CalendarDays, ArrowLeftRight } from 'lucide-react';  
import { Link, useLocation } from 'react-router-dom';  

const NavBar = () => {  
  const location = useLocation();  

  const navItems = [  
    { path: '/', label: 'Dashboard', icon: Home },  
    { path: '/visit', label: 'Visita Médica', icon: ArrowLeftRight },  
    { path: '/patients', label: 'Pacientes', icon: User },  
    { path: '/history', label: 'Historial', icon: Search },  
    { path: '/calendar', label: 'Citas', icon: CalendarDays }  
  ];  

  return (  
    <motion.nav  
      className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xl mb-6 sm:mb-8 w-full"  
      initial={{ y: -50 }}  
      animate={{ y: 0 }}  
      transition={{ duration: 0.5 }}  
    >  
      <ul className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center flex-wrap">  
        {navItems.map((item) => (  
          <motion.li key={item.path} whileHover={{ scale: 1.05 }} className="w-full sm:w-auto">  
            <Link  
              to={item.path}  
              className={`flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-medium transition-all text-sm sm:text-base w-full ${  
                location.pathname === item.path  
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'  
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'  
              }`}  
            >  
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />  
              <span className="hidden xs:inline">{item.label}</span>  
            </Link>  
          </motion.li>  
        ))}  
      </ul>  
    </motion.nav>  
  );  
};  

export default NavBar;