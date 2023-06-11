import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CollectionService} from "../impl/CollectionService";
import {Course} from "../model/Course";
import { Injectable } from "@angular/core";

@Injectable()
export class CoursesService extends CollectionService<Course>{
  public static collection: string = "courses";

  constructor(protected fireStore: AngularFirestore) {
    super(CoursesService.collection, fireStore);
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
