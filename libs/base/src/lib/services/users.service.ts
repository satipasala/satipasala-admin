
import {CollectionService} from "../impl/CollectionService";
import {User} from "../model/User";
import {Injectable} from "@angular/core";
import {DEFAULT_USER_IMAGE, USER_IMAGE_FOLDER} from "../../../../../apps/admin/src/app/admin-const";
import {Observable, of} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore} from "@angular/fire/compat/firestore";
@Injectable()
export class UsersService extends CollectionService<User> {
  public static collection = "users";

  constructor(protected  fireStore: AngularFirestore, private storage: AngularFireStorage) {
    super(UsersService.collection, fireStore);
  }

  /**
   *
   * @param uid ID of the user to find
   * @param userConsumer callback to the value change subscriber
   */
  public getUser(uid, userConsumer) {
    return this.fireStore.collection(this.collection).doc(uid).valueChanges().subscribe(action => userConsumer(action));
  }

  /**
   * return users under specific organization
   */
  public getAllowedUsers(orgType: string) {
    return this.queryCollection(query => query.where("organizationInfo", "==", orgType));
  }

  filterData(customfilters) {
    console.log("filtering by quick filters " + customfilters.field + customfilters.criteria + customfilters.filtervalue);
    return new Promise((resolve, reject) => {
      if (customfilters.criteria === '')
        reject();
      if (customfilters.filtervalue === '')
        reject();
      resolve(this.fireStore.collection(this.collection, ref =>
        ref.where(customfilters.field, customfilters.criteria, customfilters.filtervalue)).valueChanges());
    });
  }

  /**
   * Update photo URL
   *
   * @param {string} photoUrl
   * @param {User} user
   */
  public updatePhotoUrl(photoUrl: string, user: User) {
    user.photoURL = photoUrl;
    this.update(user.email, user);
  }

  /**
   * Load image from the given URL
   *
   * @param {string} urlPath
   * @returns {Observable<string>}
   */
  public getPhotoUrl(user: User): Observable<string> {
    const imageUrl = user.photoURL;
    if (imageUrl && imageUrl !== "") {
      if (imageUrl.includes(USER_IMAGE_FOLDER)) {
        return this.getFileDownloadPath(imageUrl, DEFAULT_USER_IMAGE);
      } else {
        return new Observable<string>(observer => observer.next(imageUrl));
      }
    } else {
      return new Observable<string>(observer => observer.next(DEFAULT_USER_IMAGE));
    }
  }

  /**
   * Get download path from firebase storage service
   *
   * @param {string} urlPath
   * @param {string} defaultPath
   * @returns {Observable<string>}
   */
  public getFileDownloadPath(urlPath: string, defaultPath: string): Observable<string> {
    return urlPath ? this.storage.ref(urlPath).getDownloadURL() : of(defaultPath);
  }

}
