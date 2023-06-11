import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {DEFAULT_USER_IMAGE, USER_IMAGE_FOLDER} from "../../../../../apps/admin/src/app/admin-const";
import {User} from "../model/User";
import {MediaFiles} from "../model/Resources";

@Injectable()
export class StorageService {

  constructor(private storage: AngularFireStorage) {
  }

  getUserImagePath(user: User): Observable<string> {
    if (user.photoURL == null || user.photoURL.trim().length==0) {
      return of(DEFAULT_USER_IMAGE)
    } else if (user.photoURL.includes(USER_IMAGE_FOLDER)) {
      return this.storage.ref(user.photoURL).getDownloadURL();
    } else {
      return of(user.photoURL);
    }

  }

  public getFileDownloadPath(urlPath: string, defaultPath: string): Observable<string> {
    if(urlPath == null){
      return of(defaultPath);
    }else if(urlPath.trim().startsWith('https://')){
      return of(urlPath)
    }else {
      return this.storage.ref(urlPath).getDownloadURL()
    }
  }

  public getDefaultMediaPath(mediaFiles:MediaFiles,defaultPath: string){
    if(mediaFiles == null||mediaFiles.defaultMedia==null){
      return of(defaultPath);
    }else if(mediaFiles.defaultMedia.link.trim().startsWith('https://')){
      return of(mediaFiles.defaultMedia.link.trim())
    }else {
      return this.storage.ref(mediaFiles.defaultMedia.link.trim()).getDownloadURL()
    }
  }
}
