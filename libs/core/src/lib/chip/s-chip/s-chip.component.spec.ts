import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SChip } from './s-chip.component';

describe('MatChipComponent', () => {
  let component: SChip;
  let fixture: ComponentFixture<SChip>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SChip ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SChip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
