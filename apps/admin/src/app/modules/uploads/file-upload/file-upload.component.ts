import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileItem, FileUploader} from 'ng2-file-upload';
import {StorageService, UploadItem} from "@satipasala/base";
import {Observable, of} from "rxjs";
import {DEFAULT_USER_IMAGE} from "../../../admin-const";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  get defaultUrl(): string {
    return this._defaultUrl;
  }

  @Input()
  set defaultUrl(value: string) {
    this._defaultUrl = value;
    this.imageUrl = this.storeService.getFileDownloadPath(value, DEFAULT_USER_IMAGE);
  }

  @Input() fileTypeData: string | undefined;
  @Input() multiple: boolean = true;
  @Input() disabled: boolean = false;
  @Input() loc: string = 'doc';
  @Input() stName: string;
  @Input() simplified: boolean = false;

  get startUpload(): boolean {
    return this._startUpload;
  }

  set startUpload(value: boolean) {
    this._startUpload = value;
  }

  private _defaultUrl: string;
  imageUrl: Observable<string>;

  uploadForm: FormGroup;
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  title = 'Angular File Upload';
  uploads: UploadItem[];
  private _startUpload: boolean = false;
  urls: string[] = [];

  @Output()
  uploadComplete: EventEmitter<string[]> = new EventEmitter();

  @Output()
  removePreview: EventEmitter<boolean> = new EventEmitter();

  /**
   * Constructor of generic file upload component
   * @param fb
   * @param storeService
   */
  constructor(private fb: FormBuilder, private storeService: StorageService) {
    this.uploadForm = this.fb.group({
      document: [null, null],
      type: [null, Validators.compose([Validators.required])]
    });
  }


  /**
   * Prepares selected files before processing. Removes invalid file types from uploader queue and
   * construmap(cts UploadItem with data URL for viewing
   * @param event
   */
  preview(event) {
    this.startUpload = false;
    const fileItems = this.uploader.queue;
    this.uploader.queue = fileItems.filter(t =>
      t._file.type.indexOf(this.fileTypeData.replace('*', '')) !== -1
    );
    if (!this.multiple) {
      this.uploader.queue = this.uploader.queue.reverse().slice(0, 1);
    }
    this.uploads = [];
    for (const item of this.uploader.queue) {
      const reader = new FileReader();
      console.log(item);
      reader.readAsDataURL(item._file);
      reader.onload = () => {
        // console.log(reader.result);
        this.uploads.push(new UploadItem(item, reader.result));
      };
    }
  }

  /**
   * Removes a selected file before/after uploading
   * @param item FileItem object of the selected row to be deleted
   */
  deleteRow(item) {
    for (let i = 0; i < this.uploads.length; ++i) {
      if (this.uploads[i].item === item) {
        this.uploads.splice(i, 1);
        this.uploader.removeFromQueue(item);
      }
    }
  }

  /**
   * Provides capability to remove an existing user avatar
   */
  removeUploadedImage() {
    this.imageUrl = of(DEFAULT_USER_IMAGE);
    this.removePreview.emit(true);
  }

  deleteRowOnUploadSuccess(event: { item: FileItem, url: string }) {
    this.deleteRow(event.item);
    this.urls.push(event.url)
    if (this.uploads  && this.uploads.length == 0) {
      this.uploadComplete.emit(this.urls);
    }
  }

  /**
   * Enables upload button on selected file count
   */
  noneSelected() {
    return this.uploader.queue.length === 0;
  }

  /**
   * Determines whether to display preview when media files are present
   */
  isMediaType() {
    return this.fileTypeData !== undefined && this.fileTypeData.indexOf('image') !== -1;
  }

  /**
   * init method of file-upload component
   */
  ngOnInit() {
    this.startUpload = false;
  }

  /**
   * Initiate file upload task. starUpload flag notifies the initiation of
   * upload-task component, which carries out the actual uploading task
   */
  putFiles() {
/*    for (const item of this.uploader.queue) {
      const file = item._file;
      if (file.size > 5242880) {
        alert('Each File should be less than 5MB of size.');
        return;
      }
    }*/
    this.startUpload = this.uploader.queue.length > 0;
  }
}


