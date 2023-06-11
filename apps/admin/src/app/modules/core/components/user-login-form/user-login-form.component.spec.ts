import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserLoginFormComponent } from './user-login-form.component';
import {MaterialModule} from "../../../../imports/material.module";

xdescribe('UserLoginFormComponent', () => {
  let component: UserLoginFormComponent;
  let fixture: ComponentFixture<UserLoginFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoginFormComponent ],
      imports: [
        MaterialModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
