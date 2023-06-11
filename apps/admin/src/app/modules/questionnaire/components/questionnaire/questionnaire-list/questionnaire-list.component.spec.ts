import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {QuestionnaireListComponent} from './questionnaire-list.component';
import {QuestionnaireService} from "@satipasala/base";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MockFireStore} from "@satipasala/testing";
import {QuestionnaireSubMenuComponent} from "../questionnaire-sub-menu/questionnaire-sub-menu.component";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";

describe('QuestionnaresComponent', () => {
  let component: QuestionnaireListComponent;
  let fixture: ComponentFixture<QuestionnaireListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [QuestionnaireService, {provide: AngularFirestore, useValue: MockFireStore}],
      declarations: [ QuestionnaireListComponent, QuestionnaireSubMenuComponent ],
      imports: [NoopAnimationsModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatMenuModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
