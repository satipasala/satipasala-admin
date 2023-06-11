import {RefData} from "./RefData";

export class Language implements RefData {
  id: string;
  name: string;
  native: string;
  shortName: string;
  active: string;
  description?: string;
}
