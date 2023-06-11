import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AUDIT_LOG_ROUTE,
  AUTH_MANAGEMENT_ROUTE,
  COURSE_MANAGEMENT_ROUTE,
  DASHBOARD_ROUTE,
  EVENT_MANAGEMENT_ROUTE,
  FILE_MANAGEMENT_ROUTE,
  HOST_MANAGEMENT_ROUTE,
  QUESTIONNAIRE_MANAGEMENT_ROUTE,
  REFERENCE_DATA_ROUTE,
  USERS_ROUTE,
  ACTIVITY_MANAGEMENT_ROUTE, PRIVACY_POLICY_ROUTE
} from "../../app-routs";
import { AppShellComponent } from "./app-shell-component/app-shell.component";
import { UserLoginPageComponent } from "./pages/login-page/user-login-page.component";
import { AuthGuard } from "@satipasala/base";
import {PrivacyPolicyPageComponent} from "./pages/privacy-policy-page/privacy-policy-page.component";


const routes: Routes = [
  { path: PRIVACY_POLICY_ROUTE, component: PrivacyPolicyPageComponent },
  { path: "login", component: UserLoginPageComponent },
  {
    path: '', component: AppShellComponent, canActivate: [AuthGuard],
    children: [
      // {path:DASHBOARD_ROUTE,component:ShellLoaderComponent},
      { path: DASHBOARD_ROUTE, loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: USERS_ROUTE, loadChildren: () => import('../user-management/user-management.module').then(m => m.UserManagementModule) },
      { path: HOST_MANAGEMENT_ROUTE, loadChildren: () => import('../host-management/host-management.module').then(m => m.HostManagementModule) },
      { path: COURSE_MANAGEMENT_ROUTE, loadChildren: () => import('../courses/courses.module').then(m => m.CoursesModule) },
      { path: EVENT_MANAGEMENT_ROUTE, loadChildren: () => import('../events/events.module').then(m => m.EventsModule) },
      { path: FILE_MANAGEMENT_ROUTE, loadChildren: () => import('../uploads/uploads.module').then(m => m.UploadsModule) },
      { path: FILE_MANAGEMENT_ROUTE, loadChildren: () => import('../media-player/media-player.module').then(m => m.MediaPlayerModule) },
      { path: QUESTIONNAIRE_MANAGEMENT_ROUTE, loadChildren: () => import('../questionnaire/questionnaire.module').then(m => m.QuestionnaireModule) },
      { path: AUTH_MANAGEMENT_ROUTE, loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule) },
      { path: REFERENCE_DATA_ROUTE, loadChildren: () => import('../referencedata/referencedata.module').then(m => m.ReferenceDataModule), canActivate: [AuthGuard] },
      // {path: AUDIT_LOG_ROUTE, loadChildren: () => import('../audit/audit.module').then(m => m.AuditModule)}
    ]
  },
  /* {path: 'notes', component: NotesListComponent, canActivate: [AuthGuard]},
   {path: 'uploads', component: UploadPageComponent, canActivate: [AuthGuard]},
   {path: 'ssr', component: SsrPageComponent}*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppShellRoutingModule {
}
