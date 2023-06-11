import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SSelectionListComponent } from './s-selection-list.component';

describe('SSelectionListComponent', () => {
  let component: SSelectionListComponent;
  let fixture: ComponentFixture<SSelectionListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SSelectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
