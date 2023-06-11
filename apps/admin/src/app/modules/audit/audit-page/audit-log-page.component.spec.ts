import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AuditLogPage } from './audit-page.component';

describe('AuditPageComponent', () => {
  let component: AuditLogPage;
  let fixture: ComponentFixture<AuditLogPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditLogPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
