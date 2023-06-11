import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CollectionService} from "../impl/CollectionService";
import {Course, Program} from "../model/Course";
import { Injectable } from "@angular/core";

@Injectable()
export class ProgramService extends CollectionService<Program>{
  public static collection: string = "programs";

  constructor(protected fireStore: AngularFirestore) {
    super(ProgramService.collection, fireStore);
  }

}
