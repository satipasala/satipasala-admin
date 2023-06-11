import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Role} from "../model/Role";
import {CollectionService} from "../impl/CollectionService";
import { Injectable } from "@angular/core";


@Injectable()
export class RolesService extends CollectionService<Role> {
  public static collection = "roles";

  constructor(protected fireStore: AngularFirestore) {
    super(RolesService.collection, fireStore);
  }
}
