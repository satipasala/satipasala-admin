import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LocationFormComponent } from './location-form.component';
import { MaterialModule } from 'apps/admin/src/app/imports/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'apps/admin/src/environments/environment.uat';
import {HostsService} from "@satipasala/base";

fdescribe('LocationFormComponent', () => {
  let component: LocationFormComponent;
  let fixture: ComponentFixture<LocationFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase, 'satipasala'),
        AngularFirestoreModule
      ],
      declarations: [ LocationFormComponent ],
      providers: [ HostsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
