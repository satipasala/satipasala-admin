import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RolePermissionManagementPage } from './role-permission-management-page.component';

describe('RolePermissionManagementPage', () => {
  let component: RolePermissionManagementPage;
  let fixture: ComponentFixture<RolePermissionManagementPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RolePermissionManagementPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolePermissionManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
