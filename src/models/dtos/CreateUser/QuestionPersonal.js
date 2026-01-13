export default class QuestionPersonal {
  constructor(data = {}) {
    this.Smokes = data.Smokes ?? false;
    this.SmokingYears = data.SmokingYears || 0;
    this.DrinksAlcohol = data.DrinksAlcohol ?? false;
    this.AlcoholDescription = data.AlcoholDescription || "S/N";
    this.Bruxism = data.Bruxism ?? false;
    this.BruxismDescription = data.BruxismDescription || "S/N";
    this.ChewsCoca = data.ChewsCoca ?? false;
    this.CocaDescription = data.CocaDescription || "S/N";
    this.State = data.State ?? true;
  }
}