import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {PermissionLevelPage} from "./permission-level-page.component";

describe('PermissionManagementPage', () => {
  let component: PermissionLevelPage;
  let fixture: ComponentFixture<PermissionLevelPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionLevelPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionLevelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
