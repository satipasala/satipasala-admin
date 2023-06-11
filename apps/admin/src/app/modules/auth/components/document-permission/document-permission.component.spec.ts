import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocumentPermissionComponent } from './address-form.component';

describe('AddressFormComponent', () => {
  let component: DocumentPermissionComponent;
  let fixture: ComponentFixture<DocumentPermissionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
