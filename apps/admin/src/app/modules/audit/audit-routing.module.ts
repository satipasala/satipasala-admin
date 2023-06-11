import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AUDIT_LOG_INFO_ROUTE} from "../../app-routs";
import {PermissionGuard} from "@satipasala/base";
import {AuditLogPage} from "./audit-page/audit-log-page.component";

const routes: Routes = [
   { path: "", redirectTo: AUDIT_LOG_INFO_ROUTE, pathMatch: "full" },
  {
    path: AUDIT_LOG_INFO_ROUTE,
    component: AuditLogPage,

    canActivate: [PermissionGuard],
    data: { route: AUDIT_LOG_INFO_ROUTE }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditRoutingModule {
}
