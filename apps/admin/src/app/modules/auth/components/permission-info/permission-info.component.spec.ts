import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PermissionInfoComponent } from './permission-info.component';
import {MockFireStore} from "@satipasala/testing";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {PermissionsService} from "@satipasala/base";
import {MaterialModule} from "../../../../imports/material.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";

describe('PermissionInfoComponent', () => {
  let component: PermissionInfoComponent;
  let fixture: ComponentFixture<PermissionInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers:[PermissionsService,{provide: AngularFirestore, useValue: MockFireStore}],
      declarations: [ PermissionInfoComponent ],
      imports : [
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
