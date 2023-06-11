import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserManagementRoutingModule} from './user-management-routing.module';
import {UserEditFormComponent} from './components/user-edit-form/user-edit-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatSelectModule} from "@angular/material/select";
import {MatSortModule} from "@angular/material/sort";
import {MatRadioModule} from "@angular/material/radio";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserManagementPageComponent} from './pages/user-management-page/user-management-page.component';
import {UserSubMenuComponent} from './components/user-sub-menu/user-sub-menu.component';
import {UserRegistrationPageComponent} from "./pages/user-registration-page/user-registration-page.component";
import {UserTableComponent} from './components/user-table/user-table.component';
import {UserEditPageComponent} from './pages/user-edit-page/user-edit-page.component';
import {AuthGuard, AuthService, BaseModule, RolesService, StorageService, UsersService} from "@satipasala/base";
import {CoreAdminModule} from "../core/core-admin.module";
import {CoreModule} from "@satipasala/core";
import {TextSearchComponent} from "./components/text-search/text-search.component";
import {UploadsModule} from "../uploads/uploads.module";
import {UserCourseListComponent} from "./pages/user-course-page/user-course-list.component";
import {UserFilterComponent} from "./components/user-filter/user-filter.component";
import {UserCardComponent} from "./components/user-card/user-card.component";
import {UserCourseCardComponent} from "./components/course-card/user-course-card.component";
import {ResetPasswordDialog} from './components/user-card/reset-password-dialog/reset-password-dialog.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatDialogModule} from "@angular/material/dialog";
import {MatBadgeModule} from "@angular/material/badge";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { MaterialModule } from '../../imports/material.module';

@NgModule({
  declarations: [UserManagementPageComponent, UserSubMenuComponent, UserRegistrationPageComponent, UserTableComponent,
    UserEditFormComponent, UserEditPageComponent, TextSearchComponent, UserCourseListComponent, UserCardComponent, UserFilterComponent, UserCourseCardComponent, ResetPasswordDialog],
  imports: [
    CommonModule,
    CoreAdminModule,
    UserManagementRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    BaseModule,
    UploadsModule,
    FormsModule,
    MaterialModule
  ],
  entryComponents: [ResetPasswordDialog],
  providers: [AuthService, AuthGuard, UsersService, RolesService, StorageService],
})
export class UserManagementModule {
}
