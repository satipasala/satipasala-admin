import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {MockFireStore} from "@satipasala/testing";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {PermissionsService} from "@satipasala/base";
import {MaterialModule} from "../../../../imports/material.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {RoleLevelCard} from "./permission-level-card.component";

describe('PermissionInfoComponent', () => {
  let component: RoleLevelCard;
  let fixture: ComponentFixture<RoleLevelCard>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers:[PermissionsService,{provide: AngularFirestore, useValue: MockFireStore}],
      declarations: [ RoleLevelCard ],
      imports : [
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleLevelCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
