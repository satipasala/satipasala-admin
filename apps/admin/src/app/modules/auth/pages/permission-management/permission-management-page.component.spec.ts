import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PermissionManagementPage } from './permission-management-page.component';

describe('PermissionManagementPage', () => {
  let component: PermissionManagementPage;
  let fixture: ComponentFixture<PermissionManagementPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionManagementPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
