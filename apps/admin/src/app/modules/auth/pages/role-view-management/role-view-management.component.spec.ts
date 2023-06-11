import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RoleViewManagementComponent } from './role-view-management.component';

describe('RoleViewManagementComponent', () => {
  let component: RoleViewManagementComponent;
  let fixture: ComponentFixture<RoleViewManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleViewManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleViewManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
