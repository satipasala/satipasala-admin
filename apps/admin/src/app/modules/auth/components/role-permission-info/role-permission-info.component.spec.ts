import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RolePermissionInfoComponent } from './role-permission-info.component';

describe('RolePermissionInfoComponent', () => {
  let component: RolePermissionInfoComponent;
  let fixture: ComponentFixture<RolePermissionInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RolePermissionInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolePermissionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
