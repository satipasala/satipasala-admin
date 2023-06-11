import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventMap } from './event-map.component';

describe('GoogleMapComponentComponent', () => {
  let component: EventMap;
  let fixture: ComponentFixture<EventMap>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMap ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
