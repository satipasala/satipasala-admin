import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {LocationSubMenuComponent} from "./location-sub-menu.component";
import {RouterTestingModule} from "@angular/router/testing";
import {MaterialModule} from "../../../../imports/material.module";


describe('LocationSubMenuComponent', () => {
  let component: LocationSubMenuComponent;
  let fixture: ComponentFixture<LocationSubMenuComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LocationSubMenuComponent],
      imports: [
        MaterialModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
