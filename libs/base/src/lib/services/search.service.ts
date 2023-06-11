import {Injectable} from '@angular/core';
import {SearchFilter} from '../model/SearchFilter';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {merge, Observable, of} from 'rxjs';
import {distinct, map, mergeAll} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private fireStore: AngularFirestore) {
  }

  public searchCollection(collectionName: string, ...filters: SearchFilter[]): Observable<any[]> {
    const observableList: Observable<any>[] = [];
    filters.forEach((filter) => {
      observableList.push(
        this.fireStore.collection(collectionName,
          ref => ref.where(filter.field, ">=", filter.value).where(filter.field, "<", (filter.value + 'z')).limit(5)
        ).valueChanges()
      )
    })
    /* const mergedObservable = merge(observableList).subscribe(value => {
       console.log(value)
     })*/
    return merge(observableList).pipe(  mergeAll())
  }

}
