import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {finalize, tap} from "rxjs/operators";
import {UploadItem} from "@satipasala/base";
import {FileItem} from "ng2-file-upload";
import {UploadTaskSnapshot} from "@angular/fire/compat/storage/interfaces";


@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {
  @Input() file: File;
  @Input() upload: UploadItem;
  @Input() storageLoc: string;
  @Input() storeName: string;

  @Output() onSucess = new EventEmitter<{ item:FileItem ,url:string}>();

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<UploadTaskSnapshot>;
  downloadURL: string;

  /**
   * Constructor of upload task component
   * @param storage
   * @param db
   */
  constructor(private storage: AngularFireStorage, private db: AngularFirestore) {
  }

  /**
   * init method of upload-task component
   */
  ngOnInit() {
    this.startUpload();
  }

  /**
   *Begins file uploading task for each file
   */
  startUpload() {

    if (this.upload === undefined) {//unit test fixing
      return;
    }

    const file = this.upload.item._file;
    let fName = (this.storeName && this.storeName.trim()) ? this.storeName : file.name;
    // The storage path
    const path = `${this.storageLoc}/${fName}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap((snap: UploadTaskSnapshot) => {
      }),
      // The file's download URL
      finalize(async () => {
        console.log('Storage upload complete of file: ', path);
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.db.collection('files').add({downloadURL: this.downloadURL, path, size: this.upload.size});
        this.onSucess.emit({item: this.upload.item, url: this.downloadURL});
      }),
    );
  }

  /**
   * Determines whether file upload process is in progress
   * @param snapshot current state of the upload task
   */
  isActive(snapshot: UploadTaskSnapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
}
