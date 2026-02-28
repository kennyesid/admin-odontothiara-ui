export const getStyleInternal = (theme = 'light') => {
    const root = getStyleRoot(theme);

    return {
        primary: ` ${root.primary} px-5 py-2 rounded-2xl w-full `,
        before: ` ${root.before} px-5 py-2 rounded-2xl w-full `,
        buttonBase: " inline-flex items-center justify-center transition-all active:scale-95 font-medium cursor-pointer",
        button: theme === 'night'
            ? " bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-400 "
            : " bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 ",
        input: root.input
    };
};