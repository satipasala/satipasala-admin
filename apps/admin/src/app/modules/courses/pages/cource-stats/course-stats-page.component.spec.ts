import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {CourseStatsPage} from "./course-stats-page.component";


describe('CourseStatsPage', () => {
  let component: CourseStatsPage;
  let fixture: ComponentFixture<CourseStatsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseStatsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
