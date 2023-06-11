import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Host} from "../model/Host";
import {CollectionService} from "../impl/CollectionService";
import { Injectable } from "@angular/core";

@Injectable()
export class HostsService extends CollectionService<Host> {
  public static collection: string = "hosts";

  constructor(protected fireStore: AngularFirestore) {
    super(HostsService.collection, fireStore);
  }

  /**
   *
   * @param hostId ID of the host to find
   * @param hostConsumer callback to the value change subscriber
   */
  public getHost(hostId, hostConsumer) {
    return this.fireStore.collection(this.collection).doc(hostId).valueChanges().subscribe(action => hostConsumer(action));
  }
}
