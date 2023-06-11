import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventHistogramChart } from './event-histogram-chart.component';

describe('DashboardCardComponentComponent', () => {
  let component: EventHistogramChart;
  let fixture: ComponentFixture<EventHistogramChart>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventHistogramChart ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventHistogramChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
