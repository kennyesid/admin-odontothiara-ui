export const INITIAL_PATIENT_STATE = {
    Id: 0,
    RolId: 2,
    Name: '',
    FirstSurname: '',
    SecondSurname: '',
    Image: '',
    Age: 0,
    Sexo: 'Masculino',
    BirthDate: new Date().toISOString().split('T')[0],
    PlaceOfBirth: '',
    Occupation: '',
    MaritalStatus: 'S/N',
    Address: '',
    IdentityCard: '',
    Email: '',
    Phone: '',

    // QuestionPersonal
    personalQuestions: {
        Smokes: false,
        SmokingYears: 0,
        DrinksAlcohol: false,
        AlcoholDescription: '',
        Bruxism: false,
        BruxismDescription: '',
        ChewsCoca: false,
        CocaDescription: '',
        State: true
    },

    // QuestionPathological
    pathologicalQuestions: {
        Anemia: false,
        Diabetes: false,
        HeartDisease: false,
        Allergies: false,
        AllergiesDescription: '',
        TakingMedication: false,
        Hypertension: false,
        OtherConditions: ''
    },

    // QuestionWomen
    womenQuestions: {
        IsPregnant: false,
        PregnancyTimeMonth: 0,
        LastMenstruationDate: new Date().toISOString().split('T')[0],
        State: true
    }
};