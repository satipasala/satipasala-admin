import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserProfileSubIconComponent } from './user-profile-subicon.component';

xdescribe('UserProfileComponent', () => {
  let component: UserProfileSubIconComponent;
  let fixture: ComponentFixture<UserProfileSubIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileSubIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileSubIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
