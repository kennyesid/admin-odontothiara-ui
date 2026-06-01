import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate small delay for premium UX feel
    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "admin") {
        setIsLoading(false);
        onLogin();
      } else {
        setIsLoading(false);
        setError("El correo electrónico o la contraseña son incorrectos.");
      }
    }, 800);
  };

  return (
    <div className="w-screen h-screen flex bg-slate-50 overflow-hidden font-sans antialiased">
      {/* Columna Izquierda: Presentación (Oculta en móviles) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-odont-primary overflow-hidden h-full flex-col justify-between p-12 text-white">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <img
            src="/publica.png"
            alt="Presentación Dental"
            className="w-full h-full object-cover opacity-60"
            onError={(e) => {
              // Fallback block if the image doesn't exist yet
              e.target.style.display = 'none';
            }}
          />
          {/* Degradados sofisticados para difuminar */}
          <div className="absolute inset-0 bg-gradient-to-tr from-odont-primary via-odont-primary/80 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-odont-primary to-transparent opacity-90" />
          <div className="absolute inset-0 bg-radial-at-t from-odont-secondary/30 via-transparent to-transparent" />
        </div>

        {/* Logo / Header de presentación */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
            <div className="w-4 h-4 bg-odont-turquoise rounded-sm rotate-45" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Thiara <span className="text-odont-turquoise">Arte Dental</span>
          </span>
        </div>

        {/* Mensaje de bienvenida / Eslogan */}
        <div className="relative z-10 mb-12 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-odont-turquoise text-xs font-bold uppercase tracking-[0.2em]">
              Sistema de Gestión Interna
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight mt-3 leading-tight">
              Diseñando sonrisas con la más alta tecnología.
            </h2>
            <p className="text-slate-300 mt-4 text-sm leading-relaxed">
              Bienvenido al portal administrativo. Accede para gestionar citas, pacientes, historiales clínicos y controlar las operaciones del consultorio en tiempo real.
            </p>
          </motion.div>
        </div>

        {/* Footer de la columna izquierda */}
        <div className="relative z-10 text-xs text-slate-400">
          © {new Date().getFullYear()} Thiara Arte Dental. Todos los derechos reservados.
        </div>
      </div>

      {/* Columna Derecha: Formulario de Login (Responsive) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100/80"
        >
          {/* Header del Formulario */}
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-odont-primary tracking-tight">
              Iniciar Sesión
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-2">
              Ingresa tus credenciales para acceder al panel administrativo
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Correo */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Correo Electrónico
              </label>
              <div className="relative rounded-2xl transition-all">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  required
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-odont-secondary/20 focus:border-odont-secondary focus:bg-white transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Input Contraseña */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Contraseña
                </label>
                <a href="#forgot" className="text-xs text-odont-secondary hover:text-odont-primary font-bold transition-colors">
                  ¿La olvidaste?
                </a>
              </div>
              <div className="relative rounded-2xl transition-all">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="block w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-odont-secondary/20 focus:border-odont-secondary focus:bg-white transition-all text-sm font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-odont-secondary focus:ring-odont-secondary/20 border-slate-300 rounded-lg cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs font-medium text-slate-500 cursor-pointer select-none">
                Recordarme en este dispositivo
              </label>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="flex items-start gap-2.5 p-3 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold leading-relaxed"
                >
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botón de Submit */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-2xl text-sm font-extrabold text-white bg-odont-primary hover:bg-odont-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-odont-primary disabled:opacity-50 transition-all cursor-pointer shadow-lg shadow-odont-primary/10"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Iniciando sesión...</span>
                </div>
              ) : (
                "Ingresar"
              )}
            </motion.button>
          </form>

          {/* Credenciales de demostración discretas en la parte inferior */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
              Credenciales de Acceso
            </span>
            <div className="inline-flex flex-col sm:flex-row gap-1.5 sm:gap-4 justify-center items-center bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100">
              <span className="text-xs text-slate-500 font-medium">
                Usuario: <strong className="text-slate-700 font-semibold">admin@gmail.com</strong>
              </span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="text-xs text-slate-500 font-medium">
                Contraseña: <strong className="text-slate-700 font-semibold">admin</strong>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
