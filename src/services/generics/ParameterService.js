class ParameterService {
    async getRols() {
        return [
            { id: 1, name: 'Doctor' },
            { id: 2, name: 'Administrador' },
            { id: 3, name: 'Paciente' },
            { id: 4, name: 'Enfermero/a' }
        ];
    }
}

// Exporta una instancia (NO la clase)
const parameterService = new ParameterService();
export default parameterService;

// class ParameterService {
//     async getRols() {
//         return new Promise((resolve) => {
//             resolve([
//                 { id: 1, name: 'Doctor' },
//                 { id: 2, name: 'Administrador' },
//                 { id: 3, name: 'Paciente' },
//                 { id: 4, name: 'Enfermero/a' }
//             ]);
//         });
//     };
// }

// module.exports = ParameterService;