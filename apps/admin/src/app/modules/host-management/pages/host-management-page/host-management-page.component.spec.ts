import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HostManagementPageComponent } from './host-management-page.component';
import {HostInfoComponent} from "../../components/host-info-component/host-info.component";
import {MaterialModule} from "../../../../imports/material.module";
import {HostSubMenuComponent} from "../../components/host-sub-menu/host-sub-menu.component";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MockFireStore} from "../../../../../../../../libs/testing/src/lib/firebase/MockedFireBase";
import {HostsService} from "../../../../../../../../libs/base/src/lib/services/hosts.service";

describe('HostManagementPageComponent', () => {
  let component: HostManagementPageComponent;
  let fixture: ComponentFixture<HostManagementPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers:[{provide: AngularFirestore, useValue: MockFireStore},HostsService],
      declarations: [ HostManagementPageComponent ,HostInfoComponent,HostSubMenuComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
