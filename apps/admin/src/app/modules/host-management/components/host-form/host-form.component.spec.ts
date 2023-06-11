import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HostFormComponent } from './host-form.component';

import { MaterialModule } from 'apps/admin/src/app/imports/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'apps/admin/src/environments/environment.uat';
import {HostsService} from "@satipasala/base";

fdescribe('HostFormComponent', () => {
  let component: HostFormComponent;
  let fixture: ComponentFixture<HostFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase, 'satipasala'),
        AngularFirestoreModule
      ],
      declarations: [ HostFormComponent ],
      providers: [ HostsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
