import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FileUploadComponent } from './file-upload.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FileUploadModule} from "ng2-file-upload";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {UploadTaskComponent} from "../upload-task/upload-task.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [FormBuilder, HttpClient],
      declarations: [ FileUploadComponent, UploadTaskComponent ],
      imports: [
        FileUploadModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatProgressBarModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
