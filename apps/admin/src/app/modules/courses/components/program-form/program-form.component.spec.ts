import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProgramFormComponent } from './program-form.component';
import {CoreModule, DynamicFormComponent, ErrorStateMatcherFactory} from "@satipasala/core";


describe('CourseFormComponent', () => {
  let component: ProgramFormComponent;
  let fixture: ComponentFixture<ProgramFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers:[ErrorStateMatcherFactory],
      declarations: [ ProgramFormComponent,DynamicFormComponent ],
      imports:[CoreModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
