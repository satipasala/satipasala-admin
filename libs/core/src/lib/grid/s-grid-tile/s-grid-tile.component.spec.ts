import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SGridTile } from './s-grid-tile.component';

describe('SGridTileComponent', () => {
  let component: SGridTile;
  let fixture: ComponentFixture<SGridTile>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SGridTile ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SGridTile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
