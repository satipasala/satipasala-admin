import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SGeoChartComponent } from './s-geo-chart.component';

describe('SGeoChartComponent', () => {
  let component: SGeoChartComponent;
  let fixture: ComponentFixture<SGeoChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SGeoChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SGeoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
