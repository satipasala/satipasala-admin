import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AudioPlayerComponent } from './audio-player.component';
import {MaterialModule} from "../../../../imports/material.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {UploadsModule} from "../../../uploads/uploads.module";
import {MatCardModule} from "@angular/material/card";

describe('AudioPlayerComponent', () => {
  let component: AudioPlayerComponent;
  let fixture: ComponentFixture<AudioPlayerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioPlayerComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        MatCardModule,
        UploadsModule,
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
