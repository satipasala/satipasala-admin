import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LocationInfoListComponent } from './location-info-list.component';

describe('LocationInfoListComponent', () => {
  let component: LocationInfoListComponent;
  let fixture: ComponentFixture<LocationInfoListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationInfoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
