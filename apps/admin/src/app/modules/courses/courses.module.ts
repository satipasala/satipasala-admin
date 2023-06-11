import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoursesRoutingModule} from './courses-routing.module';
import {CoursesPage} from './pages/cources-page/courses-page.component';
import {CourseSubMenuComponent} from './components/course-sub-menu/course-sub-menu.component';
import {EditCoursePage} from './pages/course-edit-page/edit-course-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CourseActivityListComponent} from './components/course-activity-list/course-activity-list.component';
import {CourseActivitySubMenuComponent} from './components/course-activity-sub-menu/course-activity-sub-menu.component';
import {ActivitiesService, BaseModule, CoursesService, UsersService} from "@satipasala/base";
import {CourseFormComponent} from "./components/course-form/course-form.component";
import {CoreModule, ErrorStateMatcherFactory} from "@satipasala/core";
import {MaterialModule} from "../../imports/material.module";
import {CourseStatsPage} from "./pages/cource-stats/course-stats-page.component";
import {CourseAssignToHostPageComponent} from './pages/course-assign-to-host-page/course-assign-to-host-page.component';
import {CourseAssignToUserPage} from './pages/course-assign-to-user-page/course-assign-to-user-page.component';
import {UserSelectionListComponent} from './components/user-selection-list/user-selection-list.component';
import {CourseStudentCardComponent} from "./components/course-student-card/course-student-card.component";
import {CourseCardComponent} from './components/course-card/course-card.component';
import {ActivityCardComponent} from './components/course-activity-card/course-activity-card.component';
import {ActivityStatusChangeDialog} from "./components/activity-info/activity-status-change-dialog/activity-status-change-dialog.component";
import {ActivityFormDialog} from "./components/activity-form-dialog/activity-form-dialog.component";
import {ActivityManagementPageComponent} from "./components/activity-management-page/activity-management-page.component";
import {ActivityInfoComponent} from "./components/activity-info/activity-info.component";
import {ProgramCardComponent} from "./components/program-card/program-card.component";
import {ProgramsPage} from "./pages/programs-page/programs-page.component";
import {ProgramService} from "../../../../../../libs/base/src/lib/services/program.service";
import {ProgramFormComponent} from "./components/program-form/program-form.component";
import {ProgramCourseCardComponent} from "./components/program-course-card/program-course-card.component";
import {ProgramCourseListComponent} from "./components/program-course-list/program-course-list.component";
import {ProgramAssignToUserPage} from "./pages/program-assign-to-user-page/program-assign-to-user-page.component";
import {CoreAdminModule} from "../core/core-admin.module";
import {UploadsModule} from "../uploads/uploads.module";

@NgModule({
  declarations: [CoursesPage, CourseStatsPage, CourseSubMenuComponent, EditCoursePage, CourseActivityListComponent, CourseActivitySubMenuComponent,
    CourseFormComponent, CourseAssignToHostPageComponent, CourseAssignToUserPage, UserSelectionListComponent, CourseStudentCardComponent, CourseCardComponent, ActivityCardComponent, ActivityInfoComponent, ActivityStatusChangeDialog, ActivityManagementPageComponent, ActivityFormDialog,
    ProgramCardComponent,ProgramsPage,ProgramFormComponent,ProgramCourseCardComponent,ProgramCourseListComponent,ProgramAssignToUserPage
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreAdminModule,
    CoreModule,
    BaseModule,
    UploadsModule,

  ],
  providers: [CoursesService,ProgramService, ErrorStateMatcherFactory, UsersService, ActivitiesService],
  entryComponents: [ActivityStatusChangeDialog, ActivityFormDialog]
})
export class CoursesModule {
}
