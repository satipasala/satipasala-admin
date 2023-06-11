import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HostUserSelectionListComponent } from './host-user-selection-list.component';

describe('HostUserSelectionListComponent', () => {
  let component: HostUserSelectionListComponent;
  let fixture: ComponentFixture<HostUserSelectionListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HostUserSelectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostUserSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
