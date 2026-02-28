export const getStyleRoot = (theme = 'light') => {
    const isNight = theme === 'night';

    return {
        // Colores de fondo y texto que cambian según el tema
        primary: isNight
            ? " bg-slate-800 text-blue-400 hover:bg-slate-700 hover:text-blue-300 "
            : " bg-odont-primary text-odont-skyblue hover:bg-odont-secondary hover:text-white ",

        before: isNight
            ? " bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white "
            : " bg-odont-turquoise text-odont-gray hover:bg-odont-secondary hover:text-white ",

        card: isNight
            ? " bg-slate-900 rounded-2xl p-6 shadow-none border border-slate-800 "
            : " bg-white rounded-odont-radius p-6 shadow-sm border border-gray-100 ",

        title: isNight
            ? " text-2xl font-bold text-white "
            : " text-2xl font-bold text-odont-primary ",

        button: isNight
            ? " bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-500 transition-all active:scale-95 font-medium "
            : " bg-odont-primary text-white px-5 py-2 rounded-lg hover:bg-odont-secondary transition-all active:scale-95 font-medium ",

        input: isNight
            ? " w-full border-2 border-slate-700 bg-slate-800 text-white p-2 rounded-md focus:border-blue-500 outline-none transition-colors "
            : " w-full border-2 border-gray-100 p-2 rounded-md focus:border-odont-secondary outline-none transition-colors ",

        roundedPanelMain: " rounded-2xl ",

        navbarButton: isNight
            ? " bg-slate-800 text-blue-400 hover:bg-slate-700 hover:text-white rounded-2xl "
            : " bg-odont-primary text-odont-skyblue hover:bg-odont-secondary hover:text-white rounded-2xl "
    };
};