import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserLoginFormComponent} from "./components/user-login-form/user-login-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {UserProfileSubIconComponent} from "./components/user-profile-subicon/user-profile-subicon.component";
import {MaterialModule} from "../../imports/material.module";
import {NotificationMessageComponent} from "./components/notification-message/notification-message.component";
import {LoadingSpinnerComponent} from "./components/loading-spinner/loading-spinner.component";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService, BaseModule, RolesService} from "@satipasala/base";
import {AutoCompleteSearchComponent} from './components/auto-complete-search/auto-complete-search.component';
import {CoreModule} from "@satipasala/core";
import {ConfirmationDialogComponent} from "./components/confirmation-dialog/confirmation-dialog.component";
import {UploadsModule} from "../uploads/uploads.module";
import {AddressFormComponent} from './components/address-form/address-form.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {UpdateProfileDialog} from './components/user-profile/update-profile-dialog/update-profile-dialog.component';
import {SearchFilterComponent} from "./components/search-filter/search-filter.component";

@NgModule({
  providers: [AngularFirestore, AuthService, RolesService],

  declarations: [
    UserLoginFormComponent, UserProfileComponent, UserProfileSubIconComponent, NotificationMessageComponent, LoadingSpinnerComponent, AutoCompleteSearchComponent, ConfirmationDialogComponent, AddressFormComponent, UpdateProfileDialog,SearchFilterComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MaterialModule, //todo remove unwanted material modules here
    CoreModule,
    BaseModule,
    MatDialogModule,
    UploadsModule
  ],
  entryComponents: [UpdateProfileDialog],
  exports: [
    UserLoginFormComponent, UserProfileComponent, UserProfileSubIconComponent, NotificationMessageComponent, LoadingSpinnerComponent, AutoCompleteSearchComponent, AddressFormComponent,SearchFilterComponent
  ]
})
export class CoreAdminModule {
}
