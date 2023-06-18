import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppShellComponent } from './app-shell.component';
import {RouterTestingModule} from "@angular/router/testing";
import {UploadsModule} from "../../uploads/uploads.module";
import {UiModule} from "../../../ui/ui.module";
import {NotesModule} from "../../../notes/notes.module";
import {AngularFireModule} from "@angular/fire";
import {environment} from "environments/environment";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {MaterialModule} from "../../../imports/material.module";
import {ServiceWorkerModule, SwUpdate} from "@angular/service-worker";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {CoreAdminModule} from "../../core/core-admin.module";


describe('AppShellComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers:[SwUpdate],
      imports: [
        ServiceWorkerModule.register('', {enabled: false}),
        RouterTestingModule,
        CoreAdminModule,
        UploadsModule,
        UiModule,
        NotesModule,
        AngularFireModule.initializeApp(environment.firebase, 'satipasala'),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        MaterialModule,
        NoopAnimationsModule
      ],
      declarations: [AppShellComponent]
    }).compileComponents();
  }));
  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppShellComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'admin'`, waitForAsync(() => {
    const fixture = TestBed.createComponent(AppShellComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('admin');
  }));
});
