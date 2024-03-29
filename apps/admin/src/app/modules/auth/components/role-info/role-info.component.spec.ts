import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RoleInfoComponent } from './role-info.component';
import {MockFireStore} from "@satipasala/testing";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {PermissionsService, RolesService} from "@satipasala/base";
import {MaterialModule} from "../../../../imports/material.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";

describe('RoleInfoComponent', () => {
  let component: RoleInfoComponent;
  let fixture: ComponentFixture<RoleInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers:[RolesService,{provide: AngularFirestore, useValue: MockFireStore}],
      declarations: [ RoleInfoComponent ],
      imports : [
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
