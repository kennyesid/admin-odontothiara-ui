export default class QuestionWomen {
  constructor(data = {}) {
    this.IsPregnant = data.IsPregnant ?? false;
    this.PregnancyTimeMonth = data.PregnancyTimeMonth || 0;
    this.LastMenstruationDate = data.LastMenstruationDate || new Date().toISOString().split('T')[0];
    this.State = data.State ?? true;
  }
}