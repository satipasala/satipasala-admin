import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FieldBuilderComponent } from './field-builder.component';

describe('FieldBuilderComponent', () => {
  let component: FieldBuilderComponent;
  let fixture: ComponentFixture<FieldBuilderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
