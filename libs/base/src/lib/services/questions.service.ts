import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CollectionService} from "../impl/CollectionService";
import {Question} from "../model/Question";
import { Injectable } from "@angular/core";


@Injectable()
export class QuestionsService extends CollectionService<Question<any>> {

  public static collection: string = "questions";

  constructor(protected fireStore: AngularFirestore) {
    super(QuestionsService.collection, fireStore);
  }
}

