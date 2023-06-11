import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SChipList } from './s-chip-list.component';

describe('MatChipListComponent', () => {
  let component: SChipList;
  let fixture: ComponentFixture<SChipList>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SChipList ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SChipList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
