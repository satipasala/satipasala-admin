import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PermissionGuard} from "@satipasala/base";
import {
   EVENT_MANAGEMENT_INFO_ROUTE,
  EVENT_MANAGEMENT_ADD_ROUTE,
  EVENT_MANAGEMENT_EDIT_ROUTE,
  EVENT_MANAGEMENT_ROUTE,
  EVENT_MANAGEMENT_VIEW_ROUTE,
  SESSION_MANAGEMENT_ADD_ROUTE,
  SESSION_MANAGEMENT_EDIT_ROUTE,
  SESSION_MANAGEMENT_ROUTE
} from "../../app-routs";
import {EventListComponent} from "./pages/event-list/event-list.component";
import {EventFormComponent} from "./components/event-form/event-form.component";
import {EventSessionComponent} from "./components/session/event-session.component";
import {EventSessionFormComponent} from "./components/session-form/event-session-form.component";

const routes: Routes = [
  {
    path: EVENT_MANAGEMENT_INFO_ROUTE,
    component: EventListComponent,
    canActivate: [PermissionGuard],
    data: {route: EVENT_MANAGEMENT_INFO_ROUTE}
  }, {
    path: EVENT_MANAGEMENT_ADD_ROUTE,
    component: EventFormComponent,
    outlet: "leftsidebar",
    canActivate: [PermissionGuard],
    data: {route: EVENT_MANAGEMENT_ROUTE}
  }, {
    path: EVENT_MANAGEMENT_VIEW_ROUTE,
    component: EventFormComponent,
    outlet: "leftsidebar",
    canActivate: [PermissionGuard],
    data: {route: EVENT_MANAGEMENT_ROUTE}
  }, {
    path: EVENT_MANAGEMENT_EDIT_ROUTE,
    component: EventFormComponent,
    outlet: "leftsidebar",
    canActivate: [PermissionGuard],
    data: {route: EVENT_MANAGEMENT_ROUTE}
  },
  {
    path: SESSION_MANAGEMENT_ROUTE,
    component: EventSessionComponent,
    outlet: "leftsidebar",
    canActivate: [PermissionGuard],
    data: {route: EVENT_MANAGEMENT_ROUTE}
  },
  {
    path: SESSION_MANAGEMENT_ADD_ROUTE,
    component: EventSessionFormComponent,
    outlet: "leftsidebar",
    canActivate: [PermissionGuard],
    data: {route: SESSION_MANAGEMENT_ADD_ROUTE}
  },{
    path: SESSION_MANAGEMENT_EDIT_ROUTE,
    component: EventSessionFormComponent,
    outlet: "leftsidebar2",
    canActivate: [PermissionGuard],
    data: {route: SESSION_MANAGEMENT_EDIT_ROUTE}
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {
}
