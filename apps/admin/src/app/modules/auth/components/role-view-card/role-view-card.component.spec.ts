import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RoleViewCardComponent } from './role-view-card.component';

describe('RoleViewCardComponent', () => {
  let component: RoleViewCardComponent;
  let fixture: ComponentFixture<RoleViewCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleViewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
