import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  USERS_COURSE_ROUTE,
  USERS_EDIT_ROUTE,
  USERS_MANAGEMENT_ROUTE,
  USERS_REGISTER_ROUTE,
} from "../../app-routs";
import {UserManagementPageComponent} from "./pages/user-management-page/user-management-page.component";
import {UserRegistrationPageComponent} from "./pages/user-registration-page/user-registration-page.component";
import {UserEditPageComponent} from "./pages/user-edit-page/user-edit-page.component";
import {TextSearchComponent} from "./components/text-search/text-search.component";
import { PermissionGuard } from '@satipasala/base';
import {UserCourseListComponent} from "./pages/user-course-page/user-course-list.component";


const routes: Routes = [
  {path: '', redirectTo: USERS_MANAGEMENT_ROUTE, pathMatch: "full"},
  {path: USERS_MANAGEMENT_ROUTE, component: UserManagementPageComponent, canActivate:[PermissionGuard],data:{route:USERS_MANAGEMENT_ROUTE}},
  {path: 'search', component: TextSearchComponent, canActivate:[PermissionGuard],data:{route:"search"}},
  {path: USERS_REGISTER_ROUTE, component: UserRegistrationPageComponent,outlet:"leftsidebar", canActivate:[PermissionGuard],data:{route:USERS_REGISTER_ROUTE}},
  {path: USERS_EDIT_ROUTE, component: UserEditPageComponent, outlet:"leftsidebar",canActivate:[PermissionGuard],data:{route:USERS_EDIT_ROUTE}},
  {path: USERS_COURSE_ROUTE, component: UserCourseListComponent, outlet:"leftsidebar",canActivate:[PermissionGuard],data:{route:USERS_COURSE_ROUTE}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {
}
