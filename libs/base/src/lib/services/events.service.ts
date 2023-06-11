import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CollectionService} from "../impl/CollectionService";
import {Injectable} from "@angular/core";
import {Event} from "../model/Event";

@Injectable()
export class EventsService extends CollectionService<Event> {
  public static collection: string = "events";

  constructor(protected fireStore: AngularFirestore) {
    super(EventsService.collection, fireStore);
  }

  /**
   * Get event
   *
   * @param eventId
   * @param courseConsumer
   * @returns {Subscription}
   */
  public getEvent(eventId, courseConsumer) {
    return this.fireStore.collection(this.collection).doc(eventId).valueChanges().subscribe(action => courseConsumer(action));
  }
}
