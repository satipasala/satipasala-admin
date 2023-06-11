import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  HOST_ASSIGN_TO_USER_ROUTE,
  HOST_LOCATIONS_INFO_ROUTE,
  HOST_MANAGEMENT_EDIT_ROUTE,
  HOST_MANAGEMENT_INFO_ROUTE
} from "../../app-routs";
import {HostManagementPageComponent} from "./pages/host-management-page/host-management-page.component";
// import {LocationInfoComponent} from "./components/location-info-component/location-info.component";
import {HostFormComponent} from './components/host-form/host-form.component';
import {PermissionGuard} from '@satipasala/base';
import {HostAssignToUsersPageComponent} from './pages/host-assign-to-users-page/host-assign-to-users-page.component';
import {LocationInfoListComponent} from "./components/location-info-list/location-info-list.component";


const routes: Routes = [
  {path: "", redirectTo: HOST_MANAGEMENT_INFO_ROUTE, pathMatch: "full"},
  {
    path: HOST_MANAGEMENT_INFO_ROUTE,
    component: HostManagementPageComponent,
    canActivate: [PermissionGuard],
    data: {route: HOST_MANAGEMENT_INFO_ROUTE}

  },
  {
    path: HOST_LOCATIONS_INFO_ROUTE,
    component: LocationInfoListComponent,
    outlet: "leftsidebar",
    canActivate: [PermissionGuard],
    data: {route: HOST_LOCATIONS_INFO_ROUTE}
  },
  {
    path: HOST_MANAGEMENT_EDIT_ROUTE,
    component: HostFormComponent,
    outlet: "leftsidebar",
    canActivate: [PermissionGuard],
    data: {route: HOST_MANAGEMENT_EDIT_ROUTE}
  },
  {path: HOST_ASSIGN_TO_USER_ROUTE, component: HostAssignToUsersPageComponent, outlet: "leftsidebar"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostManagementRoutingModule {
}
