import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GoogleMapComponentComponent } from './google-map-component.component';

describe('GoogleMapComponentComponent', () => {
  let component: GoogleMapComponentComponent;
  let fixture: ComponentFixture<GoogleMapComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleMapComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
