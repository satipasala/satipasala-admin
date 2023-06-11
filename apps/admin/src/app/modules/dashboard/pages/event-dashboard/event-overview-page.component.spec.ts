
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EventOverviewPageComponent } from './event-overview-page.component';
import {MaterialModule} from "../../../../imports/material.module";

describe('OverviewComponent', () => {
  let component: EventOverviewPageComponent;
  let fixture: ComponentFixture<EventOverviewPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EventOverviewPageComponent],
      imports: [
        MaterialModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
