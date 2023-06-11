import {
  AngularFirestore,
  AngularFirestoreCollection, DocumentChangeAction, DocumentData,
  DocumentReference, DocumentSnapshot, QueryDocumentSnapshot,
  QueryFn
} from "@angular/fire/compat/firestore";
import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import firebase from "firebase/compat/app";
import firestore = firebase.firestore;

@Injectable()
export abstract class CollectionService<T> {

  reachedEnd: boolean = false;
  lastDoc: QueryDocumentSnapshot<DocumentData>;
  collection: string;

  protected constructor(protected collectionName: string, protected fireStore: AngularFirestore) {
    this.collection = collectionName;
  }

  public setCollection(collectionName: string) {
    this.collection = collectionName
  }

  public add(doc: T): Promise<DocumentReference> {
    return this.fireStore.collection(this.collection).add(doc);
  }

  //todo generify component and remove any
  public addWithId(doc: any): Promise<void> {
    return this.fireStore.collection(this.collection).doc(doc.id).set(doc);
  }

  public update(id, doc: T): Promise<void> {
    return this.fireStore.collection(this.collection).doc(id).update(doc);
  }

  public delete(id): Promise<void> {
    return this.fireStore.collection(this.collection).doc(id).delete();
  }

  /**
   * get the collection reference of given collection name.
   * will not subscribe to updates
   * @param queryFn
   */
  public getPromised(documentId: string, queryFn?: QueryFn): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.fireStore.collection<T>(this.collection, queryFn).doc<T>(documentId).get().subscribe(
        actions => {
          resolve(this.getDocumentData(actions));
          //observer.complete();
        }, error => {
          reject(error)
        });
    })
  }


  /**
   * get the collection reference of given collection name.
   * @param queryFn
   */
  public get(documentId: string, queryFn?: QueryFn): Observable<T> {
    return new Observable<T>(subscriber => {
      this.fireStore.collection<T>(this.collection, queryFn).doc<T>(documentId).snapshotChanges().subscribe(
        actions => {
          subscriber.next(this.getDocumentData(actions.payload));
          //observer.complete();
        }, error => {
          subscriber.error(error)
        });
    })
  }


  private getDocumentData(payload: DocumentSnapshot<any> | DocumentSnapshot<DocumentData> |firestore.DocumentSnapshot): T {
    const data: T = payload.data() as T;
    if (data) {
      data['id'] = payload['id'] as string;
    }
    //  this.lastObj = data
    //return this.lastObj;
    return data;
  }


  /**
   * get data from document change action.
   * @param action
   */
  private getPayload(action: DocumentChangeAction<DocumentData>): T {
    if (action.payload != null) {
      const data: T = action.payload.doc.data() as T;
      data['id'] = action.payload.doc['id'] as string;
      //  this.lastObj = data
      //return this.lastObj;
      this.lastDoc = action.payload.doc;
      return data
    } else {
      const u1: T = null;
      return u1;
    }
  }

  /**
   * get a sumb collection of main collection
   * @param subCollectionPath
   * @param documentId
   * @param queryFn
   */
  public queryCollection(queryFn: QueryFn): Subject<T[]> {
    const dataSubject: Subject<T[]> = new Subject<T[]>();
    const collection: AngularFirestoreCollection = this.fireStore.collection(this.collection, queryFn);

    return this.onSnapshotChanges(collection, dataSubject);
  }


  /**
   * get a sumb collection of main collection
   * @param subCollectionPath
   * @param documentId
   * @param queryFn
   */
  public querySubCollection(queryFn: QueryFn, ...subCollectionPaths: SubCollectionInfo[]): Subject<T[]> {
    let collection: AngularFirestoreCollection = null;

    const dataSubject: Subject<T[]> = new Subject<T[]>();

    if (subCollectionPaths.length > 0) {
      for (let i = 0; i < subCollectionPaths.length; i++) {
        if (collection) {
          collection = this.getSubCollection(collection, subCollectionPaths[i], queryFn)
        } else {
          collection = this.getSubCollection(this.fireStore.collection(this.collection), subCollectionPaths[i], queryFn)
        }
      }

    } else {
      collection = this.fireStore.collection(this.collection, queryFn);
    }


    return this.onSnapshotChanges(collection, dataSubject);
  }

  private onSnapshotChanges(collection, dataSubject) {

    collection.snapshotChanges().subscribe(
      actions => {
        actions.length ? (this.reachedEnd = false) : (this.reachedEnd = true);
        dataSubject.next(actions.map(a => {
          return this.getPayload(a)
        }));
      });
    return dataSubject;
  }

  /**
   * get a sub collection from a given collection
   * @param collection
   * @param subCollection sub collection info along with document id
   */
  private getSubCollection(collection: AngularFirestoreCollection, subCollection: SubCollectionInfo, queryFn?: QueryFn): AngularFirestoreCollection {
    return collection.doc(subCollection.documentId).collection(subCollection.subCollection, queryFn)
  }

  /**
   * Return all documents in the collection
   * @returns {Observable<T[]>}
   */
  public getAll(): Observable<T[]> {
    console.warn("**Important** Getting all documents are very costly.Should be removed ASAP.collection:", this.collectionName);
    return this.fireStore.collection<T>(this.collection).valueChanges();
  }

  public setDoc(id, doc: T): Promise<void> {
    return this.fireStore.collection(this.collection).doc(id).set(doc);
  }
}

/**
 * sub collection info used for sub collection retrieval
 */
export interface SubCollectionInfo {
  documentId: string,
  subCollection: string;
}
