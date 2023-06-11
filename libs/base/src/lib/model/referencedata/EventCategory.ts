import { RefData } from "./RefData";

export class EventCategory implements RefData {
    id: string;
    name : string;
    active : string;
    public description?: string;
}
