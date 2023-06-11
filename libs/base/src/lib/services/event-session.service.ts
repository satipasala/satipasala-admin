import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { Feedback } from '../model/Feedback';
import {CollectionService} from "../impl/CollectionService";
import {EventSession} from "../model/EventSession";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventSessionService extends CollectionService<EventSession> {
  public static collection: string = "eventSessions";

  constructor(protected fireStore: AngularFirestore) {
    super(EventSessionService.collection, fireStore);
  }

  getEvents(eventId:string):Subject<EventSession[]>{
    return this.queryCollection(query => query.where("eventId", "==", eventId));
  }
}
