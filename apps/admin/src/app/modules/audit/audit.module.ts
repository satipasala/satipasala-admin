import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditLogPage } from './audit-page/audit-log-page.component';
import { AuditItemComponent } from './audit-item/audit-item.component';
import {CoreModule} from "@satipasala/core";
import {BaseModule} from "@satipasala/base";
import {AuditRoutingModule} from "./audit-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";



@NgModule({
  declarations: [AuditLogPage, AuditItemComponent],
  imports: [
    CommonModule,
    AuditRoutingModule,
    CoreModule,
    BaseModule,
    MatCardModule,
    MatChipsModule
  ]
})
export class AuditModule { }
