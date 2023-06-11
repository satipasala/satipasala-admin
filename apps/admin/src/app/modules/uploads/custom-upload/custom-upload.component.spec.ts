import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomUploadComponent } from './custom-upload.component';
import {FileUploadComponent} from "../file-upload/file-upload.component";
import {ActivatedRoute} from "@angular/router";
import {FileUploadModule} from "ng2-file-upload";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {UploadTaskComponent} from "../upload-task/upload-task.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";

describe('CustomUploadComponent', () => {
  let component: CustomUploadComponent;
  let fixture: ComponentFixture<CustomUploadComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [{provide: ActivatedRoute, useValue: fakeActivatedRoute}],
      declarations: [ CustomUploadComponent, FileUploadComponent, UploadTaskComponent ],
      imports:[
        FileUploadModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatProgressBarModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
