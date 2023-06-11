import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventUserCardComponent } from './event-user-card.component';

describe('UserTableComponent', () => {
  let component: EventUserCardComponent;
  let fixture: ComponentFixture<EventUserCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventUserCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
