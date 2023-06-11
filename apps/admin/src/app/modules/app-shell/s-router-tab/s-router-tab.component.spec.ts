import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SRouterTabComponent } from './s-router-tab.component';

describe('SRouterTabComponent', () => {
  let component: SRouterTabComponent;
  let fixture: ComponentFixture<SRouterTabComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SRouterTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SRouterTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
