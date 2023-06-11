import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HostInfoComponent } from './host-info.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HostSubMenuComponent} from "../host-sub-menu/host-sub-menu.component";
import {MaterialModule} from "../../../../imports/material.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MockFireStore} from "@satipasala/testing";
import {HostsService} from "@satipasala/base";

fdescribe('HostInfoComponent', () => {
  let component: HostInfoComponent;
  let fixture: ComponentFixture<HostInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers:[HostsService,{provide: AngularFirestore, useValue: MockFireStore}],
      declarations: [ HostInfoComponent ,HostSubMenuComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
