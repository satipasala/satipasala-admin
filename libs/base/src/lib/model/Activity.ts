import { ActivityType } from './referencedata/ActivityType';
import {RitchMedia} from "./Resources";

export interface Activity extends RitchMedia{
  id: string;
  name: string;
  active: string;
  description: string;
  type: ActivityType;
  maxPoints: number;
  gradable: string;
  resource:Object
}
