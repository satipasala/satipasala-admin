import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthService, BaseModule, PermissionsService, RolesService, UserClaimService,} from "@satipasala/base";
import {PermissionInfoComponent} from './components/permission-info/permission-info.component';
import {RoleInfoComponent} from './components/role-info/role-info.component';
import {MaterialModule} from "../../imports/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RoleManagementPage} from './pages/role-management/role-management-page.component';
import {PermissionManagementPage} from './pages/permission-management/permission-management-page.component';
import {RolePermissionInfoComponent} from './components/role-permission-info/role-permission-info.component';
import {RolePermissionManagementPage} from './pages/role-permission-management/role-permission-management-page.component';
import {CoreModule} from "@satipasala/core";
import {RoleCardComponent} from './components/role-card/role-card.component';
import {PermissionCardComponent} from "./components/permission-card/permission-card.component";
import {RoleCoursePageComponent} from "./pages/role-course-management/role-course-page.component";
import {RoleCourseCardComponent} from "./components/course-card/role-course-card.component";
import {PermissionComponent} from './components/permission/permission.component';
import {RoleViewManagementComponent} from './pages/role-view-management/role-view-management.component';
import {RoleViewCardComponent} from './components/role-view-card/role-view-card.component';
import {PermissionLevelPage} from "./pages/permission-levels-page/permission-level-page.component";
import {PermissionLevelCard} from "./components/permission-level-card/permission-level-card.component";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {DocumentPermissionComponent} from "./components/document-permission/document-permission.component";
import {AuthCourseCardComponent} from "./components/auth-course-card/auth-course-card.component";
import {RoleLevelPage} from "./pages/role-levels-page/role-level-page.component";
import {RoleLevelCard} from "./components/role-level-card/role-level-card.component";

@NgModule({

  declarations: [PermissionInfoComponent, RoleInfoComponent, RoleManagementPage, PermissionManagementPage,
    RolePermissionInfoComponent, RolePermissionManagementPage, PermissionComponent,
    RoleCardComponent, PermissionCardComponent, RoleCoursePageComponent,
    RoleCourseCardComponent, RoleViewManagementComponent, RoleViewCardComponent, PermissionLevelPage,
    PermissionLevelCard, DocumentPermissionComponent,AuthCourseCardComponent,RoleLevelPage,RoleLevelCard],

  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule, FormsModule,
    CoreModule,
    BaseModule,

  ],
  providers: [AuthService, PermissionsService, RolesService, UserClaimService]
})
export class AuthModule {
}
