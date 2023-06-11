import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { Feedback } from '../model/Feedback';
import {CollectionService} from "../impl/CollectionService";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends CollectionService<Feedback> {
  public static collection: string = "feedback";

  constructor(protected fireStore: AngularFirestore) {
    super(FeedbackService.collection, fireStore);
  }
}
