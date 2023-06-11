import {NgModule} from '@angular/core';
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {CommonModule} from "@angular/common";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/compat/auth";
import {HostsService} from "./services/hosts.service";
import {LocationsService} from "./services/locations.service";
import {AuthService} from "./services/auth.service";
import {NotifyService} from "./services/notify.service";
import {CoursesService} from "./services/courses.service";
import {QuestionnaireService} from "./services/questionnaire.service";
import {QuestionsService} from "./services/questions.service";
import {ReferenceDataService} from "./services/reference-data.service";
import {UsersService} from "./services/users.service";
import {PermissionsService} from "./services/permissions.service";
import {EnumToArrayPipe} from "./pipes/EnumToArrayPipe";
import {InfiniteScrollService} from "./services/InfiniteScrollService";
import {NamedOutletDirective} from "./directives/named-outlet";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {CourseSubscriptionService} from './services/course-subscription-service';
import {StatsService} from "./services/stats.service";
import {LinkAccountDialog} from "./component/link-account-dialog/link-account-dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { SpinnerOverlayComponent } from './services/spinner/spinner-overlay/spinner-overlay.component';
import { SpinnerOverlayWrapperComponent } from './services/spinner/spinner-overlay-wrapper/spinner-overlay-wrapper.component';
import {SpinnerComponent} from "./services/spinner/spinner-component/spinner.component";
import {SafePipe} from "./pipes/SafePipe";
import {EventStopPropagationDirective} from "./directives/event-stop-propergation";
@NgModule({

  declarations: [SafePipe,EnumToArrayPipe, NamedOutletDirective, LinkAccountDialog,SpinnerOverlayComponent,SpinnerComponent, SpinnerOverlayWrapperComponent,EventStopPropagationDirective],
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,

  ],
  exports: [SafePipe,EnumToArrayPipe, NamedOutletDirective,SpinnerOverlayWrapperComponent,SpinnerOverlayComponent,SpinnerComponent,EventStopPropagationDirective],

  providers: [
    AngularFireAuth,
    AngularFirestore,
    HostsService,
    LocationsService,
    AuthService,
    CoursesService,
    QuestionnaireService,
    QuestionsService,
    ReferenceDataService,
    PermissionsService,
    UsersService,
    CourseSubscriptionService,
    NotifyService,
    InfiniteScrollService,
    StatsService
  ], entryComponents: [LinkAccountDialog]
})
export class BaseModule {
}
