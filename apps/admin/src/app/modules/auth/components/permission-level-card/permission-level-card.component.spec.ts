import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {MockFireStore} from "@satipasala/testing";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {PermissionsService} from "@satipasala/base";
import {MaterialModule} from "../../../../imports/material.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {PermissionLevelCard} from "./permission-level-card.component";

describe('PermissionInfoComponent', () => {
  let component: PermissionLevelCard;
  let fixture: ComponentFixture<PermissionLevelCard>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers:[PermissionsService,{provide: AngularFirestore, useValue: MockFireStore}],
      declarations: [ PermissionLevelCard ],
      imports : [
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionLevelCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
