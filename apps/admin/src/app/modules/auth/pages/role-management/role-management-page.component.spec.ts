import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RoleManagementPage } from './role-management-page.component';

describe('RoleManagementPage', () => {
  let component: RoleManagementPage;
  let fixture: ComponentFixture<RoleManagementPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleManagementPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
