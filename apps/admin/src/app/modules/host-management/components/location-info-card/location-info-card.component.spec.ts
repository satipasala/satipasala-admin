import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LocationInfoCardComponent } from './location-info-card.component';

describe('LocationInfoCardComponent', () => {
  let component: LocationInfoCardComponent;
  let fixture: ComponentFixture<LocationInfoCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationInfoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
