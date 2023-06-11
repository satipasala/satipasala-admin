import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuestionnaireSubMenuComponent } from './questionnaire-sub-menu.component';
import { MaterialModule } from 'apps/admin/src/app/imports/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";

describe('CourseSubMenuComponent', () => {
  let component: QuestionnaireSubMenuComponent;
  let fixture: ComponentFixture<QuestionnaireSubMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireSubMenuComponent ],
      imports: [
        MaterialModule,
        MatIconModule,
        MatMenuModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
