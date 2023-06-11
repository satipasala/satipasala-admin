import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  QUESTIONNAIRE_MANAGEMENT_EDIT_ROUTE,
  QUESTIONNAIRE_MANAGEMENT_INFO_ROUTE,
  QUESTIONNAIRE_MANAGEMENT_ROUTE,
  QUESTION_MANAGEMENT_ROUTE,
  QUESTION_MANAGEMENT_ACTION_ROUTE,
  QUESTION_MANAGEMENT_ADD_ROUTE,
  QUESTION_MANAGEMENT_INFO_ROUTE, QUESTIONNAIRE_MANAGEMENT_ADD_ROUTE, QUESTIONNAIRE_MANAGEMENT_LIST_ROUTE
} from "../../app-routs";
import {QuestionnaireListPage} from "./pages/questionnaire-list-page/questionnaire-list-page.component";
import {QuestionsPage} from "./pages/questions-page/questions-page.component";
import {QuestionnaireEditPage} from "./pages/questionnaire-question-edit-page/questionnaire-edit-page.component";
import {QuestionnaireInfoPage} from "./pages/questionnaire-info-page/questionnaire-info-page.component";
import {QuestionCreationPageComponent} from "./pages/question-creation-page/question-creation-page.component";
import {QuestionInfoComponent} from "./components/question/question-info/question-info.component";
import { PermissionGuard } from '@satipasala/base';


const routes: Routes = [
  {path: '', redirectTo:QUESTIONNAIRE_MANAGEMENT_LIST_ROUTE, pathMatch:'full'},
  {path: QUESTIONNAIRE_MANAGEMENT_LIST_ROUTE, component: QuestionnaireListPage,canActivate:[PermissionGuard],data:{route:QUESTIONNAIRE_MANAGEMENT_LIST_ROUTE}},
  {path: QUESTION_MANAGEMENT_ROUTE, component: QuestionsPage,canActivate:[PermissionGuard],data:{route:QUESTION_MANAGEMENT_ROUTE}},

  {path: QUESTIONNAIRE_MANAGEMENT_EDIT_ROUTE, component: QuestionnaireEditPage, outlet:"leftsidebar", canActivate:[PermissionGuard],data:{route:QUESTIONNAIRE_MANAGEMENT_EDIT_ROUTE}},
  {path: QUESTIONNAIRE_MANAGEMENT_ADD_ROUTE, component: QuestionnaireEditPage,outlet:"leftsidebar",canActivate:[PermissionGuard],data:{route:QUESTIONNAIRE_MANAGEMENT_ADD_ROUTE}},
  {path: QUESTIONNAIRE_MANAGEMENT_INFO_ROUTE, component: QuestionnaireInfoPage,outlet:"leftsidebar",canActivate:[PermissionGuard],data:{route:QUESTIONNAIRE_MANAGEMENT_INFO_ROUTE}},

  {path: QUESTION_MANAGEMENT_ROUTE+"/"+QUESTION_MANAGEMENT_ACTION_ROUTE, component: QuestionCreationPageComponent,outlet:"leftsidebar",canActivate:[PermissionGuard],data:{route:QUESTION_MANAGEMENT_ACTION_ROUTE}},
  {path: QUESTION_MANAGEMENT_ROUTE+"/"+QUESTION_MANAGEMENT_ADD_ROUTE, component: QuestionCreationPageComponent,outlet:"leftsidebar",canActivate:[PermissionGuard],data:{route:QUESTION_MANAGEMENT_ADD_ROUTE}},
  {path: QUESTION_MANAGEMENT_ROUTE+"/"+QUESTION_MANAGEMENT_INFO_ROUTE, component: QuestionInfoComponent,outlet:"leftsidebar",canActivate:[PermissionGuard],data:{route:QUESTION_MANAGEMENT_INFO_ROUTE}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionnaireRoutingModule { }
