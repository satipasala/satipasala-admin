import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AUTH_MANAGEMENT_ROUTE_PERMISSIONS,
  AUTH_MANAGEMENT_ROUTE_ROLES,
  AUTH_MANAGEMENT_ROUTE_ROLES_ADD_ROLE_ABS,
  AUTH_MANAGEMENT_ROUTE_ROLES_COURSES,
  AUTH_MANAGEMENT_ROUTE_ROLES_PERMISSION,
  AUTH_MANAGEMENT_ROUTE_VIEW_ROLE_INFO,
  AUTH_MANAGEMENT_ROUTE, AUTH_MANAGEMENT_ROUTE_PERMISSION_LEVELS, AUTH_MANAGEMENT_ROUTE_ROLE_LEVELS
} from "../../app-routs";
import { RoleManagementPage } from "./pages/role-management/role-management-page.component";
import { PermissionManagementPage } from "./pages/permission-management/permission-management-page.component";
import { RolePermissionManagementPage } from "./pages/role-permission-management/role-permission-management-page.component";
import { PermissionGuard } from '@satipasala/base';
import { RoleCoursePageComponent } from "./pages/role-course-management/role-course-page.component";
import { RoleViewManagementComponent } from './pages/role-view-management/role-view-management.component';
import {PermissionLevelPage} from "./pages/permission-levels-page/permission-level-page.component";
import {RoleLevelPage} from "./pages/role-levels-page/role-level-page.component";

const routes: Routes = [
  // { path: "", redirectTo: AUTH_MANAGEMENT_ROUTE, pathMatch: "full" },
  {
    path: AUTH_MANAGEMENT_ROUTE_ROLE_LEVELS,
    component: RoleLevelPage,
    canActivate: [PermissionGuard],
    data: {permission: 'collection_roles', type:'edit'}
  },{
    path: AUTH_MANAGEMENT_ROUTE_PERMISSIONS,
    component: PermissionManagementPage,
    canActivate: [PermissionGuard],
    data: {permission: 'collection_roles', type:'edit'}
  },{
    path: AUTH_MANAGEMENT_ROUTE_ROLES,
    component: RoleManagementPage,
    canActivate: [PermissionGuard],
    data: {permission: 'collection_roles', type:'view'}
  },{
    path: AUTH_MANAGEMENT_ROUTE_PERMISSION_LEVELS,
    component: PermissionLevelPage,
    canActivate: [PermissionGuard],
    data: {permission: 'collection_roles', type:'edit'}
  },
  {
    path: AUTH_MANAGEMENT_ROUTE_VIEW_ROLE_INFO,
    component: RoleViewManagementComponent,
    outlet: 'leftsidebar',
    canActivate: [PermissionGuard],
    data: {permission: 'collection_roles', type:'view'}
  },

  {
    path: AUTH_MANAGEMENT_ROUTE_ROLES_PERMISSION,
    component: RolePermissionManagementPage,
    outlet: 'leftsidebar',
    canActivate: [PermissionGuard],
    data: {permission: 'collection_roles', type:'edit'}
  },
  {
    path: AUTH_MANAGEMENT_ROUTE_ROLES_COURSES,
    component: RoleCoursePageComponent,
    outlet: 'leftsidebar',
    canActivate: [PermissionGuard],
    data: {permission: 'collection_roles', type:'edit'}
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
