import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CourseSubscription} from "../model/CourseSubscription";
import {CollectionService} from "../impl/CollectionService";
import { Injectable } from "@angular/core";

@Injectable()
export class CourseSubscriptionService extends CollectionService<CourseSubscription> {
  public static collection: string = "courseSubscriptions";

  constructor(protected fireStore: AngularFirestore) {
    super(CourseSubscriptionService.collection, fireStore);
  }

}
