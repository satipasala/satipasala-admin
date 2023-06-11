import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HostAssignToUsersPageComponent } from './host-assign-to-users-page.component';

describe('HostAssignToUsersPageComponent', () => {
  let component: HostAssignToUsersPageComponent;
  let fixture: ComponentFixture<HostAssignToUsersPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HostAssignToUsersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostAssignToUsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
