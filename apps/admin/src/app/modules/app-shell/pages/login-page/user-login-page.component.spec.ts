import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {UserLoginPageComponent} from './user-login-page.component';
import {UserLoginFormComponent} from "../../../core/components/user-login-form/user-login-form.component";
import {MaterialModule} from "../../../../imports/material.module";

xdescribe('UserLoginPageComponent', () => {
  let component: UserLoginPageComponent;
  let fixture: ComponentFixture<UserLoginPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserLoginPageComponent,UserLoginFormComponent],
      imports: [
        MaterialModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
