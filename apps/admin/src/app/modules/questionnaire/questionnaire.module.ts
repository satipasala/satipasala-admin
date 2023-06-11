import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { QuestionnaireListComponent } from './components/questionnaire/questionnaire-list/questionnaire-list.component';
import { QuestionnaireListPage } from './pages/questionnaire-list-page/questionnaire-list-page.component';
import { QuestionnaireSubMenuComponent } from "./components/questionnaire/questionnaire-sub-menu/questionnaire-sub-menu.component";
import { MaterialModule } from "../../imports/material.module";
import { QuestionsPage } from './pages/questions-page/questions-page.component';
import { QuestionsListComponent } from './components/question/questionns-list/questions-list.component';
import { QuestionnaireInfoPage } from './pages/questionnaire-info-page/questionnaire-info-page.component';
import { QuestionnaireStepperComponent } from './components/questionnaire/questionnaire-stepper/questionnaire-stepper.component';
import { QuestionnaireEditPage } from "./pages/questionnaire-question-edit-page/questionnaire-edit-page.component";
import { QuestionCreationPageComponent } from './pages/question-creation-page/question-creation-page.component';
import { QuestionSubMenuComponent } from './components/question/question-sub-menu/question-sub-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionInfoComponent } from './components/question/question-info/question-info.component';
import { BaseModule } from "@satipasala/base";
import { CoreModule } from "@satipasala/core";
import { QuestionnaireQuestionCard } from "./components/question/question-card/questionnaire-question-card.component";
import { QuestionStatusChangeDialog } from './components/question/questionns-list/question-status-change-dialog/question-status-change-dialog.component';
@NgModule({
  declarations: [QuestionnaireListComponent, QuestionnaireSubMenuComponent, QuestionnaireListPage,
    QuestionsPage, QuestionsListComponent, QuestionnaireInfoPage, QuestionnaireStepperComponent
    , QuestionCreationPageComponent, QuestionSubMenuComponent, QuestionInfoComponent,
    QuestionnaireEditPage, QuestionnaireQuestionCard, QuestionStatusChangeDialog],
  exports: [
    QuestionnaireStepperComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    QuestionnaireRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BaseModule,
    CoreModule
  ],
  entryComponents: [QuestionStatusChangeDialog]
})
export class QuestionnaireModule {
}
