import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OverviewPageComponent} from "./pages/overview/overview-page.component";
import {DASHBOARD_EVENT_OVERVIEW_ROUTE, DASHBOARD_OVERVIEW_ROUTE, EMBEDDED_DASHBOARDS} from "../../app-routs";
import {AuthGuard} from "@satipasala/base";
import {EventOverviewPageComponent} from "./pages/event-dashboard/event-overview-page.component";
import {EmbeddedDashboardPageComponent} from "./pages/embedded-dashboard/embedded-dashboard-page.component";

const routes: Routes = [
  {path: '', redirectTo:DASHBOARD_OVERVIEW_ROUTE,pathMatch: 'full'},
  {path: DASHBOARD_OVERVIEW_ROUTE, component: OverviewPageComponent,canActivate: [AuthGuard]},
  /*{path: DASHBOARD_EVENT_OVERVIEW_ROUTE, component: EventOverviewPageComponent,canActivate: [AuthGuard]},*/
  {path: EMBEDDED_DASHBOARDS, component: EmbeddedDashboardPageComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
