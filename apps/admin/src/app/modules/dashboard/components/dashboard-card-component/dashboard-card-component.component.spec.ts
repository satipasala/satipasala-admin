import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashboardCardComponentComponent } from './dashboard-card-component.component';

describe('DashboardCardComponentComponent', () => {
  let component: DashboardCardComponentComponent;
  let fixture: ComponentFixture<DashboardCardComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCardComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
