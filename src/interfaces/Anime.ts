import { Review } from "./Review";

export interface Anime {
  id: string;
  name: string;
  score: number;
  description: string;
  reviews: Review[];
}
