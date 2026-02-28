import React from 'react'
// import { STYLE_ROOT } from '@/styles/styleGeneric'
import { STYLE_INTERNAL } from '@/styles/styleInternal';

// const STYLE_INTERNAL = {
//     // Clases base de color (Asegúrate de tener configurado odont-primary en tailwind.config.js)
//     primary: ` ${STYLE_ROOT.primary} px-5 py-2 rounded-2xl w-full `, // Fallback a azul estándar si la config no carga
//     before: ` ${STYLE_ROOT.before} px-5 py-2 rounded-2xl w-full `,
//     // Botón base (estilos compartidos)
//     buttonBase: " inline-flex items-center justify-center transition-all active:scale-95 font-medium cursor-pointer",

//     // Botón completo estándar
//     button: " bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 ",

//     // Inputs estándar (referencia)
//     input: "w-full border-2 border-gray-100 p-2 rounded-md focus:border-blue-400 outline-none transition-colors"
// };

const ButtonGeneric = ({
    as: Component = 'button',
    variant = 'button',
    className = '',
    children,
    disabled,
    ...props
}) => {
    const combinedClasses = `
    ${STYLE_INTERNAL[variant] || ''} 
    ${STYLE_INTERNAL.buttonBase || ''} 
    ${className}
    ${disabled ? 'transition-opacity opacity-50' : ''}
  `.trim().replace(/\s+/g, ' ');

    return (
        <Component
            className={combinedClasses}
            disabled={disabled}
            {...props}
        >
            {children}
        </Component>
    );
}

export default ButtonGeneric