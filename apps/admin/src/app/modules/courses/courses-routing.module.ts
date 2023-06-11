import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CoursesPage} from './pages/cources-page/courses-page.component';
import {EditCoursePage} from './pages/course-edit-page/edit-course-page.component';
import {
  COURSE_MANAGEMENT_ACTION_ROUTE,
  COURSE_ACTIVITY_INFO_ROUTE,
  COURSE_FEEDBACK_ROUTE,
  COURSE_ASSIGN_TO_USER_ROUTE,
  COURSE_MANAGEMENT_INFO_ROUTE,
  ACTIVITY_MANAGEMENT_INFO_ROUTE,
  PROGRAM_FEEDBACK_ROUTE,
  PROGRAM_MANAGEMENT_INFO_ROUTE,
  PROGRAM_MANAGEMENT_ACTION_ROUTE,
  PROGRAM_COURSE_INFO_ROUTE,
  PROGRAM_ASSIGN_TO_USER_ROUTE
} from '../../app-routs';
import {CourseStatsPage} from "./pages/cource-stats/course-stats-page.component";
import {CourseAssignToUserPage} from "./pages/course-assign-to-user-page/course-assign-to-user-page.component";
import {CourseActivityListComponent} from "./components/course-activity-list/course-activity-list.component";

import {PermissionGuard} from '@satipasala/base';
import {ActivityManagementPageComponent} from "./components/activity-management-page/activity-management-page.component";
import {ProgramsPage} from "./pages/programs-page/programs-page.component";
import {ProgramFormComponent} from "./components/program-form/program-form.component";
import {ProgramCourseListComponent} from "./components/program-course-list/program-course-list.component";
import {ProgramAssignToUserPage} from "./pages/program-assign-to-user-page/program-assign-to-user-page.component";


const routes: Routes = [
  {
    path: COURSE_MANAGEMENT_INFO_ROUTE,
    component: CoursesPage,
    canActivate: [PermissionGuard],
    data: {permission: 'collection_courses', type:'view'}
  },
  {
    path: COURSE_FEEDBACK_ROUTE,
    component: CourseStatsPage,
    canActivate: [PermissionGuard],
    data: {permission: 'collection_feedbacks', type:'edit'}
  },
  {
    path: ACTIVITY_MANAGEMENT_INFO_ROUTE,
    component: ActivityManagementPageComponent,
    canActivate: [PermissionGuard],
    data: {permission: 'collection_activities', type:'view'}
  },
  {
    path: COURSE_ASSIGN_TO_USER_ROUTE,
    component: CourseAssignToUserPage,
    outlet: "leftsidebar",
    canActivate: [PermissionGuard],
    data: {permission: 'collection_users', type:'edit'}
  },
  {
    path: COURSE_ACTIVITY_INFO_ROUTE,
    outlet: "leftsidebar",
    component: CourseActivityListComponent,
    canActivate: [PermissionGuard],
    data: {permission: 'collection_activities', type:'view'}
  },
  {
    path: COURSE_MANAGEMENT_ACTION_ROUTE,
    component: EditCoursePage,
    outlet: "leftsidebar",
    canActivate: [PermissionGuard],
    data: {permission: 'collection_courses', type:'edit'}
  },
  {
    path: PROGRAM_MANAGEMENT_INFO_ROUTE,
    component: ProgramsPage,
    canActivate: [PermissionGuard],
    data: {permission: 'collection_programs', type:'view'}
  },
  {
    path: PROGRAM_MANAGEMENT_ACTION_ROUTE,
    component: ProgramFormComponent,
    outlet: "leftsidebar",
    canActivate: [PermissionGuard],
    data: {permission: 'collection_programs', type:'edit'}
  }, {
    path: PROGRAM_COURSE_INFO_ROUTE,
    component: ProgramCourseListComponent,
    outlet: "leftsidebar",
    canActivate: [PermissionGuard],
    data: {permission: 'collection_programs', type:'edit'}
  },
  {
    path: PROGRAM_ASSIGN_TO_USER_ROUTE,
    component: ProgramAssignToUserPage,
    outlet: "leftsidebar",
    canActivate: [PermissionGuard],
    data: {permission: 'collection_programs', type:'edit'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {
}
