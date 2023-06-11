import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  REFERENCE_DATA_ACTIVITY_TYPE_ROUTE,
  REFERENCE_DATA_CITIES_ROUTE,
  REFERENCE_DATA_LANGUAGE_ROUTE,
  REFERENCE_DATA_LOCATION_TYPE_ROUTE,
  REFERENCE_DATA_ORGANIZATION_TYPE_ROUTE,
  REFERENCE_DATA_QUESTION_LABEL_ROUTE,
  REFERENCE_DATA_QUESTION_TYPE_ROUTE,
  REFERENCE_DATA_STATES_ROUTE,
  REFERENCE_DATA_EVENT_CATEGORY_ROUTE,
  REFERENCE_DATA_DASHBOARD_TYPE
} from "../../app-routs";
import { ActivityTypesComponent } from "./components/type/activitytypes/activitytypes.component";
import { QuestionTypesComponent } from "./components/type/questiontypes/questiontypes.component";
import { OrganizationTypesComponent } from "./components/type/organizationtypes/organizationtypes.component";
import { LanguageComponent } from "./components/type/languages/language.component";
import { PermissionGuard } from '@satipasala/base';
import { CitiesComponent } from "./components/type/cities/cities.component";
import { QuestionLabelsComponent } from "./components/type/questionlabels/questionlabels.component";
import { StatesComponent } from "./components/type/states/states.component";
import { EventCategoriesComponent } from './components/type/eventCategories/eventCategories.component';
import {DahboardTypeComponent} from "./components/type/dashboards/dashboard-type.component";


const routes: Routes = [
  { path: '', redirectTo: REFERENCE_DATA_ACTIVITY_TYPE_ROUTE, pathMatch: 'full' },
  {
    path: REFERENCE_DATA_ACTIVITY_TYPE_ROUTE,
    component: ActivityTypesComponent,
    canActivate: [PermissionGuard],
    data: {permission: 'collection_referencedata', type:'view'}
  },
  {
    path: REFERENCE_DATA_QUESTION_TYPE_ROUTE,
    component: QuestionTypesComponent,
    canActivate: [PermissionGuard],
    data: {permission: 'collection_referencedata', type:'view'}
  },
  {
    path: REFERENCE_DATA_QUESTION_LABEL_ROUTE,
    component: QuestionLabelsComponent,
    canActivate: [PermissionGuard],
    data: {permission: 'collection_referencedata', type:'view'}
  },
  {
    path: REFERENCE_DATA_ORGANIZATION_TYPE_ROUTE,
    component: OrganizationTypesComponent,
    canActivate: [PermissionGuard],
    data: {permission: 'collection_referencedata', type:'view'}
  },
  {
    path: REFERENCE_DATA_LANGUAGE_ROUTE,
    component: LanguageComponent,
    canActivate: [PermissionGuard],
    data: {permission: 'collection_referencedata', type:'view'}
  }/*,
  {
    path: REFERENCE_DATA_LOCATION_TYPE_ROUTE,
    component: LocationTypesComponent,
    canActivate: [PermissionGuard],
    data: { route: REFERENCE_DATA_LOCATION_TYPE_ROUTE }
  }*/,
  {
    path: REFERENCE_DATA_CITIES_ROUTE,
    component: CitiesComponent,
    canActivate: [PermissionGuard],
    data: {permission: 'collection_referencedata', type:'view'}
  },
  {
    path: REFERENCE_DATA_STATES_ROUTE,
    component: StatesComponent,
    canActivate: [PermissionGuard],
    data: {permission: 'collection_referencedata', type:'view'}
  },
  {
    path: REFERENCE_DATA_EVENT_CATEGORY_ROUTE,
    component: EventCategoriesComponent,
    canActivate: [PermissionGuard],
    data: {permission: 'collection_referencedata', type:'view'}
  },{
    path: REFERENCE_DATA_DASHBOARD_TYPE,
    component: DahboardTypeComponent,
    canActivate: [PermissionGuard],
    data: {permission: 'collection_referencedata', type:'view'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferenceDataRoutingModule {
}
