import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CollectionService} from "../impl/CollectionService";

@Injectable()
export class InfiniteScrollService extends CollectionService<any> {

  constructor(protected fireStore: AngularFirestore) {
    super(undefined, fireStore);
  }


}
