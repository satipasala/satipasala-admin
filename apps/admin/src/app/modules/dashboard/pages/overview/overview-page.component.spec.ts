
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OverviewPageComponent } from './overview-page.component';
import {MaterialModule} from "../../../../imports/material.module";

describe('OverviewComponent', () => {
  let component: OverviewPageComponent;
  let fixture: ComponentFixture<OverviewPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewPageComponent],
      imports: [
        MaterialModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
