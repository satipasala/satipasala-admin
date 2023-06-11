import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SPieChart } from './s-pie-chart.component';

describe('SPieChartComponent', () => {
  let component: SPieChart;
  let fixture: ComponentFixture<SPieChart>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SPieChart ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SPieChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
