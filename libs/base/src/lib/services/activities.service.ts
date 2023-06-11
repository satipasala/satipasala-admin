import { AngularFirestore } from "@angular/fire/compat/firestore";
import { CollectionService } from "../impl/CollectionService";
import { Injectable } from "@angular/core";
import { Activity } from '../model/Activity';

@Injectable()
export class ActivitiesService extends CollectionService<Activity>{
  public static collection: string = "activities";

  constructor(protected fireStore: AngularFirestore) {
    super(ActivitiesService.collection, fireStore);
  }

  /**
   *
   * @param hostId ID of the host to find
   * @param hostConsumer callback to the value change subscriber
   */
  public getCourse(courseId, courseConsumer) {
    return this.fireStore.collection(this.collection).doc(courseId).valueChanges().subscribe(action => courseConsumer(action));
  }
}
