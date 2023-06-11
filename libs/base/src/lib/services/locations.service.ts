import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference, QueryFn} from "@angular/fire/compat/firestore";
import {Location} from "../model/Location";
import {CollectionService} from "../impl/CollectionService";

@Injectable()
export class LocationsService extends CollectionService<Location> {
  public static collection: string = "locations";

  constructor(protected fireStore: AngularFirestore) {
    super(LocationsService.collection, fireStore);
  }
}
