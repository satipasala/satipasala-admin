import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HostManagementRoutingModule} from './host-management-routing.module';
import {HostManagementPageComponent} from './pages/host-management-page/host-management-page.component';
import {HostInfoComponent} from './components/host-info-component/host-info.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HostSubMenuComponent} from "./components/host-sub-menu/host-sub-menu.component";
import {LocationSubMenuComponent} from "./components/location-sub-menu/location-sub-menu.component";
import {BaseModule, HostsService} from "@satipasala/base";
import {LocationFormComponent} from './components/location-form-component/location-form.component';
import {HostFormComponent} from './components/host-form/host-form.component';
import {CoreModule} from "@satipasala/core";
import {UploadsModule} from '../uploads/uploads.module';
import {CoreAdminModule} from "../core/core-admin.module";
import {MaterialModule} from "../../imports/material.module";
import {LocationSelectDialog} from "./components/host-form/location-select-dialog/location-select-dialog.component";
import {HostAssignToUsersPageComponent} from './pages/host-assign-to-users-page/host-assign-to-users-page.component';
import {HostUserSelectionListComponent} from './components/host-user-selection-list/host-user-selection-list.component';
import {HostStudentCardComponent} from './components/host-student-card/host-student-card.component';
import {LocationInfoCardComponent} from './components/location-info-card/location-info-card.component';
import {LocationInfoListComponent} from './components/location-info-list/location-info-list.component';
import {LocationCreateForm} from "./components/host-form/location-create-form/location-create-form";
import { HostStatusChangeDialog } from './components/host-info-component/host-status-change-dialog/host-status-change-dialog.component';

@NgModule({
  declarations: [HostManagementPageComponent, HostInfoComponent, HostSubMenuComponent, LocationSubMenuComponent,
    LocationFormComponent, HostFormComponent, LocationSelectDialog, HostAssignToUsersPageComponent,
    HostUserSelectionListComponent, HostStudentCardComponent, LocationInfoCardComponent, LocationInfoListComponent,
    LocationCreateForm, HostStatusChangeDialog
  ],
  imports: [
    CommonModule,
    CoreAdminModule,
    HostManagementRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    BaseModule,
    UploadsModule,
    FormsModule,
    MaterialModule
  ],
  entryComponents: [LocationSelectDialog, HostStatusChangeDialog],
  providers: [HostsService]
})
export class HostManagementModule {
}
