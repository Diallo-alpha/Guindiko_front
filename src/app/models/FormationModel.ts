// src/app/models/FormationModel.ts
export interface FormationModel {
  id?: number,
  nom: string;
  domaine_id: number; // Assurez-vous que cette propriété est incluse
  description: string;
}
