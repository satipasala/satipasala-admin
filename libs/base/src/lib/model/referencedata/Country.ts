import {Language} from "../country/Language";
import {RefData} from "./RefData";

export interface Country extends RefData {
  id: string;
  name: string;
  native: string;
  active: string;
  phone: string;
  capital: string;
  currency: string;
  emoji: string;
  emojiU: string;
  continent: string;
  shortName: string;
  languages: Language[];
}

