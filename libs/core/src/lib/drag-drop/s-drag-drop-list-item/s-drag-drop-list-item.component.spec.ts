import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SDragDropListItem } from './s-drag-drop-list-item.component';

describe('DragDropListComponentComponent', () => {
  let component: SDragDropListItem;
  let fixture: ComponentFixture<SDragDropListItem>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SDragDropListItem ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SDragDropListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
