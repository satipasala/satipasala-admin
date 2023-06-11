import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserRegistrationPageComponent } from './user-registration-page.component';

xdescribe('UserRegistrationPageComponent', () => {
  let component: UserRegistrationPageComponent;
  let fixture: ComponentFixture<UserRegistrationPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegistrationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
