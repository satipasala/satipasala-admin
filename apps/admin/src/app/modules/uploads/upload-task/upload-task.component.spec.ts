import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UploadTaskComponent } from './upload-task.component';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MockFireStore} from "@satipasala/testing";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {MatProgressBarModule} from "@angular/material/progress-bar";

fdescribe('UploadTaskComponent', () => {
  let component: UploadTaskComponent;
  let fixture: ComponentFixture<UploadTaskComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [{provide: AngularFireStorage, useValue:[]}, {provide: AngularFirestore, useValue: MockFireStore}],
      declarations: [ UploadTaskComponent ],
      imports:[MatProgressBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
