import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {State} from "../model/referencedata/State";
import {CollectionService} from "../impl/CollectionService";

@Injectable({
  providedIn: 'root'
})
export class StateService extends  CollectionService<State>{

  public static collection: string = "states";

  constructor(protected fireStore: AngularFirestore) {
    super(StateService.collection, fireStore);
  }
}
