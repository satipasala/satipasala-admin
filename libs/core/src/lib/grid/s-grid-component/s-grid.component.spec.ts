import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SGrid } from './s-grid.component';

describe('GridComponentComponent', () => {
  let component: SGrid;
  let fixture: ComponentFixture<SGrid>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SGrid ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
