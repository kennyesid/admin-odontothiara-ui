export default class QuestionPathological {
  constructor(data = {}) {
    this.Anemia = data.Anemia ?? false;
    this.Diabetes = data.Diabetes ?? false;
    this.HeartDisease = data.HeartDisease ?? false;
    this.Allergies = data.Allergies ?? false;
    this.AllergiesDescription = data.AllergiesDescription || "S/N";
    this.TakingMedication = data.TakingMedication ?? false;
    this.Hypertension = data.Hypertension ?? false;
    this.OtherConditions = data.OtherConditions || "S/N";
  }
}