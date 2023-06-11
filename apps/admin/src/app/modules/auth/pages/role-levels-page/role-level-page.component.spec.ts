import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {RoleLevelPage} from "./permission-level-page.component";

describe('PermissionManagementPage', () => {
  let component: RoleLevelPage;
  let fixture: ComponentFixture<RoleLevelPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleLevelPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleLevelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
