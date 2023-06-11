import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CollectionService} from "../impl/CollectionService";
import {DocumentCountStat, Stat} from "../model/Stat";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatsService extends CollectionService<any> {
  public static collection: string = "stats";

  constructor(protected fireStore: AngularFirestore) {
    super(StatsService.collection, fireStore);
  }

  getDocumentCount():Observable<DocumentCountStat>{
    return new Observable<DocumentCountStat>(subscriber => {
      this.get('documentCount').subscribe(stat => {
        subscriber.next(stat?stat:{})
      },error => {
        console.error("error getting document count.",error);
        subscriber.error(error);
      })
    })
  }
}
