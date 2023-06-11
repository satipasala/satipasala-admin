import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {HostSubMenuComponent} from "./host-sub-menu.component";
import {RouterTestingModule} from "@angular/router/testing";
import {MaterialModule} from "../../../../imports/material.module";


describe('HostSubMenuComponent', () => {
  let component: HostSubMenuComponent;
  let fixture: ComponentFixture<HostSubMenuComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HostSubMenuComponent],
      imports: [
        MaterialModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
