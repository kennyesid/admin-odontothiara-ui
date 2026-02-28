import QuestionPathological from "./QuestionPathological";
import QuestionPersonal from "./QuestionPersonal";
import QuestionWomen from "./QuestionWomen";

export default class PatientRegistration {
  constructor(data = {}) {
    // Campos exactos de la tabla "User"
    this.Id = data.Id || 0;
    this.RolId = data.RolId || 2; // Default 2 para Pacientes
    this.Name = data.Name || "";
    this.FirstSurname = data.FirstSurname || "";
    this.SecondSurname = data.SecondSurname || "";
    this.Image = data.Image || "";
    this.Age = data.Age || 0;
    this.Sexo = data.Sexo || "S/N";
    this.BirthDate = data.BirthDate || new Date().toISOString().split('T')[0];
    this.PlaceOfBirth = data.PlaceOfBirth || "S/N";
    this.Occupation = data.Occupation || "S/N";
    this.MaritalStatus = data.MaritalStatus || "S/N";
    this.Address = data.Address || "S/N";
    this.IdentityCard = data.IdentityCard || "";
    this.Email = data.Email || "";
    this.Phone = data.Phone || "0";
    this.CreatedAt = data.CreatedAt || new Date().toISOString();
    // this.State = data.State ?? true;

    // Sub-objetos que representan las tablas relacionadas
    this.personalQuestions = new QuestionPersonal(data.personalQuestions);
    this.womenQuestions = new QuestionWomen(data.womenQuestions);
    this.pathologicalQuestions = new QuestionPathological(data.pathologicalQuestions);
  }

  /**
   * Crea el payload estructurado para NestJS
   */
  toApiPayload() {
    return {
      user: { ...this },
      personal: { ...this.personalQuestions },
      pathological: { ...this.pathologicalQuestions },
      women: this.Sexo === "Femenino" ? { ...this.womenQuestions } : null
    };
  }
}