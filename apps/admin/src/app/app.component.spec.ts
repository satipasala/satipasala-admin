import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CoreAdminModule } from './modules/core/core.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { UiModule } from './ui/ui.module';
import { NotesModule } from './notes/notes.module';
import { AngularFireModule } from '@angular/fire/compat/';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import {MaterialModule} from "./imports/material.module";

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreAdminModule,
        UploadsModule,
        UiModule,
        NotesModule,
        AngularFireModule.initializeApp(environment.firebase, 'satipasala'),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        MaterialModule
      ],
      declarations: [AppComponent]
    }).compileComponents();
  }));
  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('admin');
  }));
});
