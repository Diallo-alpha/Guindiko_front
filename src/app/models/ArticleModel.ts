import { CommentaireModel } from './CommentaireModel';
export interface ArticleModel{
  user_id?: number;
  titre?: string;
  description?: string;
  image?: string;
  date_publication?: Date;
  utilisateur_id?: number;
  formation_id?: number;
  // commentaires?: CommentaireModel[];
}
