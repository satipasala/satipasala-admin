import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserSubMenuComponent } from './user-sub-menu.component';
import {MaterialModule} from "../../../../imports/material.module";
import {RouterTestingModule} from "@angular/router/testing";

describe('HostSubMenuComponent', () => {
  let component: UserSubMenuComponent;
  let fixture: ComponentFixture<UserSubMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSubMenuComponent ],
      imports:[
        MaterialModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
