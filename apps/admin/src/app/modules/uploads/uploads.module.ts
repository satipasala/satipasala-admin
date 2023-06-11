import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadsRoutingModule} from "./uploads-routing.module";
import {UploadPageComponent} from './upload-page/upload-page.component';
import {DropZoneDirective} from './drop-zone.directive';
import {FileSizePipe} from './file-size.pipe';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {FileUploadModule} from 'ng2-file-upload';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {CustomUploadComponent} from './custom-upload/custom-upload.component';
import {UploadTaskComponent} from './upload-task/upload-task.component';
import {StorageService} from "@satipasala/base";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    UploadPageComponent,
    FileUploadComponent,
    DropZoneDirective,
    FileSizePipe,
    CustomUploadComponent,
    UploadTaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    UploadsRoutingModule,
    HttpClientModule,
    FileUploadModule
  ],
  exports: [
    FileUploadComponent
  ],
  providers: [StorageService]
})
export class UploadsModule { }
