import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserManagementPageComponent } from './user-management-page.component';
import {RouterTestingModule} from "@angular/router/testing";
import {UserSubMenuComponent} from "../../components/user-sub-menu/user-sub-menu.component";
import {MaterialModule} from "../../../../imports/material.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('UserManagementPageComponent', () => {
  let component: UserManagementPageComponent;
  let fixture: ComponentFixture<UserManagementPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementPageComponent,UserSubMenuComponent ],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
