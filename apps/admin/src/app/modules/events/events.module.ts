import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from "./events-routing.module";
import { EventListComponent } from "./pages/event-list/event-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "@satipasala/core";
import { MaterialModule } from "../../imports/material.module";
import { BaseModule, EventsService } from "@satipasala/base";
import { EventFormComponent } from './components/event-form/event-form.component';
import { UploadsModule } from "../uploads/uploads.module";
import { EventCardComponent } from './components/event-card/event-card.component';
import { CoreAdminModule } from '../core/core-admin.module';
import { MatStepperModule } from "@angular/material/stepper";
import { EventUserCardComponent } from "./components/event-user-card/event-user-card.component";
import { EventFacilitatorCardComponent } from './components/event-facilitator-card/event-facilitator-card.component';
import { EventStatusChangeDialog } from './components/event-card/event-status-change-dialog/event-status-change-dialog.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {EventDeleteConfimationDialog} from "./components/event-card/event-delete-confirmation-dialog/event-delete-confirmation-dialog.component";
import {EventSessionComponent} from "./components/session/event-session.component";
import {EventSessionFormComponent} from "./components/session-form/event-session-form.component";
import {EventSessionService} from "../../../../../../libs/base/src/lib/services/event-session.service";
import {EventSessionCardComponent} from "./components/session-card/event-session-card.component";

@NgModule({
  declarations: [EventListComponent,EventSessionComponent,EventSessionFormComponent, EventSessionCardComponent,EventFormComponent, EventCardComponent, EventUserCardComponent, EventFacilitatorCardComponent, EventStatusChangeDialog,EventDeleteConfimationDialog,],
    imports: [
        CommonModule,
        MaterialModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        BaseModule,
        CoreModule,
        EventsRoutingModule,
        UploadsModule,
        CoreAdminModule,
        FontAwesomeModule,

    ],
  providers: [EventsService, EventSessionService,EventStatusChangeDialog,EventDeleteConfimationDialog]
})
export class EventsModule {
}
