import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SInfiniteScrollGrid } from './infinite-scroll-grid.component';

describe('InfiniteScrollComponent', () => {
  let component: SInfiniteScrollGrid;
  let fixture: ComponentFixture<SInfiniteScrollGrid>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SInfiniteScrollGrid ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SInfiniteScrollGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
