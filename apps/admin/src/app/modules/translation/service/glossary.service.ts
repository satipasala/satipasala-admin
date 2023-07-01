import {Injectable} from '@angular/core';
import {CollectionService} from "@satipasala/base";
import {TranslateText} from "./translate-text.TranslateText";
import {AngularFirestore} from "@angular/fire/compat/firestore"; 
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class GlossaryService extends CollectionService<TranslateText> {
  public static collection: string = "glossary";

  constructor(protected fireStore: AngularFirestore) {
    super(GlossaryService.collection, fireStore);
  }

  public getGlossary(id, callback) {
    return this.fireStore.collection(this.collection).doc(id).valueChanges().subscribe(action => callback(action));
  }

  public createTranslation(textToTranslate: TranslateText) {
    textToTranslate.translated = "No";
    textToTranslate.uid = uuidv4();
    this.fireStore.collection(`glossary/${textToTranslate.lang}/translations`).add(textToTranslate);
  }

}
