import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SDragDropList } from './s-drag-drop-list.component';

describe('DragDropListComponent', () => {
  let component: SDragDropList;
  let fixture: ComponentFixture<SDragDropList>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SDragDropList ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SDragDropList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
