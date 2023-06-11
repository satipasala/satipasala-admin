import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CollectionService} from "../impl/CollectionService";
import {Questionnaire} from "../model/Questionnaire";
import { Injectable } from "@angular/core";

@Injectable()
export class QuestionnaireService extends CollectionService<Questionnaire> {

  public static collection: string = "questionnaires";

  constructor(protected fireStore: AngularFirestore) {
    super(QuestionnaireService.collection, fireStore);
  }
}
