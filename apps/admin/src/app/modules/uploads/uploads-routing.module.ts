import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UploadPageComponent} from "./upload-page/upload-page.component";
import {
  FILE_MANAGEMENT_PDF_UPLOAD_ROUTE,
  FILE_MANAGEMENT_IMG_UPLOAD_ROUTE,
  FILE_MANAGEMENT_AUDIO_FILES_ROUTE
} from "../../app-routs";
import {CustomUploadComponent} from "./custom-upload/custom-upload.component";
import { PermissionGuard } from '@satipasala/base';


const routes: Routes = [
  {path: FILE_MANAGEMENT_IMG_UPLOAD_ROUTE, component: CustomUploadComponent,canActivate:[PermissionGuard], data:{ type: 'image/*', location: 'img',route:FILE_MANAGEMENT_IMG_UPLOAD_ROUTE}},
  {path: FILE_MANAGEMENT_PDF_UPLOAD_ROUTE, component: CustomUploadComponent,canActivate:[PermissionGuard], data:{ type: 'application/pdf', location: 'pdf',route:FILE_MANAGEMENT_PDF_UPLOAD_ROUTE}},
  {path: 'uploadAudio', component: CustomUploadComponent,canActivate:[PermissionGuard], data: { type: 'audio/*',route:"uploadAudio",}},
  {path: 'uploads', component: UploadPageComponent, canActivate:[PermissionGuard],data:{route:"uploads"}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadsRoutingModule {
}
