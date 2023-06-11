import {ChangeDetectorRef, Injectable, NgZone} from '@angular/core';

import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable, ReplaySubject} from 'rxjs';
import {RefData} from "../model/referencedata/RefData";
import {QuestionLevel, ScoringMechanism} from "../model/Question";

import {CollectionService} from "../impl/CollectionService";
import {Questionnaire} from "../model/Questionnaire";
import {Option} from "../model/fields/Option";
import {NotificationService} from "./notificationService";
import firebase from "firebase/compat/app";
import firestore = firebase.firestore;

@Injectable()
export class ReferenceDataService extends CollectionService<RefData> {

  private static collectionName: string = "referencedata";
  private static collection: string = "reference_data"; //TODO: Replace with 'referencedata' (above)
  private referenceDataMap: Map<RefDataType, ReplaySubject<any[]>> = new Map();//Contains both active and inactive references
  private activeReferenceDataMap: Map<RefDataType, ReplaySubject<any>> = new Map();//Contains only active references

  constructor(protected fireStore: AngularFirestore, private notificationService: NotificationService) {
    super(ReferenceDataService.collectionName, fireStore);
  }


  /**
   * This method checks whether there is a subscription to the requested reference data type. If it is, observable will
   * return the last known values from the cache while subscribing to real time updates. If there is no subscription
   * (i.e. this is very first request for this reference data type), create a new subscription to the firestore for real
   * time updates and send the latest data once receive from server. Subsequently all the subscribers are kept updated with
   * the real time values.
   *
   * ##IMPORTANT:
   * As this returns an observable with stream of data, it is important to **unsubscribe** whenever subscription
   * is **not** required. Failure to do so will lead to a memory leak.
   *
   * ### Examples
   * ### Get data once without real time updates
   *   this.refDataService.getData("activityTypes").subscribe(activityArray => {
   *       console.log( activityArray);
   *   }).unsubscribe(); //Unsubscribe at the end if values are needed only once
   *
   * ### Multiple subscriptions by unsubscribing to the existing
   *   var activityObservable = this.refDataService.getData("activityTypes").subscribe(activityArray => {
   *       console.log( activityArray);
   *   });
   *   ...
   *   activityObservable.unsubscribe(); //Unsubscribe from existing subscription if above code gets repeated.
   *
   * ### Subscribe with real time updates
   * (All the available values will be sent whenever subscribing document is updated)
   *
   *   this.refDataService.getData(RefDataType.ACTIVITY).subscribe(activityArray => {
   *       console.log( activityArray);
   *   });
   *
   * @param {RefDataType} dataType - @see {@link RefDataType}
   * @param {boolean} activeOnly - if true ony active items will be given
   * @returns {Observable<any[]>}
   */
  public getData<T extends RefData>(dataType: RefDataType, activeOnly: boolean): Observable<T[]> {
    return new Observable<T[]>(subscriber => {
      const tempRefDataMap = activeOnly ? this.activeReferenceDataMap : this.referenceDataMap;
      if (tempRefDataMap.get(dataType) == null) {
        tempRefDataMap.set(dataType, new ReplaySubject<RefData[]>());
        this.fireStore.firestore.collection(ReferenceDataService.collectionName).doc(dataType).onSnapshot(documentSnapshot => {
          const source = documentSnapshot.metadata.fromCache ? "local cache" : "server";
          console.log("********** Source of data: " + source);
          const data = documentSnapshot.data();
          const dataArray: T[] = [];
          if (data) {
            for (const key of Object.keys(data)) {
              let dataItem = data[key];
              dataItem.id = key;

              if (activeOnly) {
                const active = (data[key] as RefData).active;
                if (active !== undefined && active === 'Yes') {
                  dataArray.push(dataItem);
                }
              } else {
                dataArray.push(dataItem);
              }
            }
          }
          dataArray.sort((a, b) => a.name != null && a.name.localeCompare(b.name));// Sort data array based on name
          tempRefDataMap.get(dataType).next(dataArray);
          this.reachedEnd = true;
        });
      }
      //create a copy of ref data each time so that any client side changes wont affect to ref data state.see bug #329
      tempRefDataMap.get(dataType).asObservable()
        .subscribe(values => subscriber.next(JSON.parse(JSON.stringify(values))), error => subscriber.error(error));
    });
  }

  /**
   * Add or update data to the given reference data type.
   * ###Note:
   * Name field is used as the key to find record. If there exists a record with the same name, that record will be updated with the given data.
   *
   * @param {RefDataType} dataType enum
   * @param data - data object
   */
  public mergeData<T extends RefData>(dataType: RefDataType, data: any): void {
    const doc = this.fireStore.collection(ReferenceDataService.collectionName).doc(dataType);
    doc.set({[data.id ? data.id : data.name]: data}, {merge: true}).then(resp => console.log("Record merged successfully!")
    );
  }

  /**
   * Add or update data to the given reference data type.
   * ###Note:
   * Name field is used as the key to find record. If there exists a record with the same name, that record will be updated with the given data.
   *
   * @param {RefDataType} dataType enum
   * @param data - data object
   */
  public removeData<T extends RefData>(dataType: RefDataType, data: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.notificationService.startLoadingIndicator("Deleting " + dataType)
      const doc = this.fireStore.collection(ReferenceDataService.collectionName).doc(dataType);
      doc.update({[data.id]: firestore.FieldValue.delete()}).then(resp => {
        console.log("Record removed successfully!");
        this.activeReferenceDataMap.delete(dataType);
        this.referenceDataMap.delete(dataType);
        this.notificationService.showSuccessNotification("Delete " + dataType);
        resolve(true);
      }).catch(reason => {
        this.notificationService.showErrorNotification("Delete " + dataType)
        reject(true);
      });
    })

  }

  public getLocationTemplateByName(templateName: string): Observable<any> {

    return this.fireStore.collection(ReferenceDataService.collection).doc("host").collection("location_templates",
      query => query.where('host_type', '==', templateName).limit(1))
      .get()
  }


  public getQuestionLevels(): Array<QuestionLevel> {
    return [
      <QuestionLevel>{
        name: "Beginner",
        color: "primary"
      }, <QuestionLevel>{
        name: "Intermediate",
        color: "accent"
      }, <QuestionLevel>{
        name: "Advanced",
        color: "warn"
      }
    ]
  }

  /*
    public getQuestionTypes(): Array<QuestionType<any>> {
      return [
        <QuestionType<any>>{
          id: "1",
          name: "Multiple Choice",
          type: "MULTIPLE_CHOICE"
        }, <QuestionType<any>>{
          id: "2",
          name: "Written",
          type: "WRITTEN"
        }
      ]
    }
  */

  getQuestionScoringMechanisms(): ScoringMechanism[] {
    return [
      {
        id: "",
        name: "",
        description: "",
        type: "SCALE"
      },

      {
        id: "",
        name: "",
        description: "",
        type: "REVERSE_SCALE"
      }
    ]
  }

  getOptionsByQuetionType(questionType: String): Option<any>[] {
    switch (questionType) {
      case "RARELY_SOMETIMES":
        return [
          <Option<Number>>{
            imageUrl: "",
            label: "Rarely/Not at all",
            value: 1
          },
          <Option<Number>>{
            imageUrl: "",
            label: "Sometimes",
            value: 2
          },
          <Option<Number>>{
            imageUrl: "",
            label: "Often",
            value: 3
          },
          <Option<Number>>{
            imageUrl: "",
            label: "Almost",
            value: 4
          }];
      case "NEVER_ALOT":
        return [<Option<Number>>{
          imageUrl: "",
          label: "Never",
          value: 1
        }, <Option<Number>>{
          imageUrl: "",
          label: "A Little",
          value: 2
        }, <Option<Number>>{
          imageUrl: "",
          label: "Sometimes",
          value: 3
        }, <Option<Number>>{
          imageUrl: "",
          label: "A Lot",
          value: 4
        }];
      case "ALMOST_NEVER":
        return [<Option<Number>>{
          imageUrl: "",
          label: "Almost Always",
          value: 1
        }, <Option<Number>>{
          imageUrl: "",
          label: "Very Frequently",
          value: 2
        }, <Option<Number>>{
          imageUrl: "",
          label: "Somewhat frequently",
          value: 3
        }, <Option<Number>>{
          imageUrl: "",
          label: "somewhat infrequently",
          value: 4
        }, <Option<Number>>{
          imageUrl: "",
          label: "Very Infrequently",
          value: 5
        }, <Option<Number>>{
          imageUrl: "",
          label: "Almost Never",
          value: 5
        }];
      case "WRITTEN":
        return [<Option<String>>{
          imageUrl: "",
          label: "Written Answer",
          value: ""
        }];
      default:
        return []

    }
  }

  /*getQuestionsTypes(): QuestionType<any>[] {
    return [
      {
        id: "1",
        name: "Multiple Choice",
        type: "MULTIPLE_CHOICE",
        answerType: "ALMOST_NEVER",
        fieldType: "radio",
        label: "Answer Almost Never",
      }, {
        id: "2",
        name: "Multiple Choice",
        type: "MULTIPLE_CHOICE",
        answerType: "RARELY_SOMETIMES",
        fieldType: "radio",
        label: "Answer Rarely Some Times",
      },
      {
        id: "3",
        name: "Multiple Choice",
        type: "MULTIPLE_CHOICE",
        answerType: "NEVER_ALOT",
        fieldType: "radio",
        label: "Answer Never A lot",
      }, {
        id: "4",
        name: "Written",
        type: "WRITTEN",
        answerType: "WRITTEN",
        fieldType: "text",
        label: "Answer Written",
      }
    ]
  }*/


  getQuestionnaires(): Observable<Questionnaire[]> {


    //todo optimize questionnaire service reads for reference data
    return null;
  }
}

/**
 * Reference data types as appeared in the firestore DB
 *
 */
export enum RefDataType {
  ACTIVITY_TYPE = "activityTypes",
  PROGRAM = "programs",
  QUESTION_TYPE = "questionTypes",
  COUNTRY = "countries",
  STATE = "states",
  CITY = "cities",
  SCHOOL_TYPE = "schoolTypes",
  ORGANIZATION_TYPE = "organizationTypes",
  LOCATION_TYPE = "locationTypes",
  LANGUAGE = "languages",
  QUESTION_LABEL = "questionLabels",
  PERMISSION_LEVEL = "permissionLevels",
  PERMISSION = "permissions",
  ROLE_LEVEL = "roleLevels",
  EVENT_CATEGORY = "eventCategories",
  DASHBOARD_TYPES = "dashboardTypes"
}
