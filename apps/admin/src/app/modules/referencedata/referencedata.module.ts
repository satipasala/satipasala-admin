import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../../imports/material.module";
import { ReferenceDataRoutingModule } from "./referencedata-routing.module";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { ActivityTypesComponent } from "./components/type/activitytypes/activitytypes.component";
import { RefDataContextMenuComponent } from "./components/base";
import { ActivityTypeFormComponent } from "./components/type/activitytypes/activity-type-form/activity-type-form.component";
import { QuestionTypeFormComponent } from "./components/type/questiontypes/question-type-form/question-type-form.component";
import { QuestionTypesComponent } from "./components/type/questiontypes/questiontypes.component";
import { ConfirmationDialogComponent } from "../core";
import { CoreAdminModule } from "../core/core-admin.module";
import { OrganizationTypeFormComponent } from "./components/type/organizationtypes/organization-type-form/organization-type-form.component";
import { LanguageFormComponent } from "./components/type/languages/language-form/language-form.component";
import { OrganizationTypesComponent } from "./components/type/organizationtypes/organizationtypes.component";
import { LanguageComponent } from "./components/type/languages/language.component";
import { CoreModule } from "@satipasala/core";
import { BaseModule } from "@satipasala/base";
import { LocationTypeFormComponent } from "./components/type/schooltypes/school-type-form/location-type-form.component";
import { LocationTypesComponent } from "./components/type/schooltypes/location-types.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CitiesComponent } from './components/type/cities/cities.component'
import { BaseRefDataCard } from "./components/base/base-refdata-card/base-ref-data-card.component";
import { QuestionLabelFormComponent } from "./components/type/questionlabels/question-label-form/question-label-form.component";
import { QuestionLabelsComponent } from "./components/type/questionlabels/questionlabels.component";
import { CityFormComponent } from "./components/type/cities/city-form/city-form.component";
import { StateFormComponent } from "./components/type/states/states-form/state-form.component";
import { StatesComponent } from "./components/type/states/states.component";
import { EventCategoriesComponent } from './components/type/eventCategories/eventCategories.component';
import { EventCategoryFormComponent } from './components/type/eventCategories/event-category-form/event-category-form.component';
import {DashboardTypeFormComponent} from "./components/type/dashboards/event-category-form/dashboard-type-form.component";
import {DahboardTypeComponent} from "./components/type/dashboards/dashboard-type.component";


@NgModule({
  declarations: [ActivityTypesComponent, RefDataContextMenuComponent, ActivityTypeFormComponent, QuestionTypesComponent,
    QuestionTypeFormComponent, ActivityTypeFormComponent, ActivityTypesComponent,
    LocationTypeFormComponent, LocationTypesComponent, OrganizationTypeFormComponent, OrganizationTypesComponent, LanguageFormComponent,
    LanguageComponent, CitiesComponent, BaseRefDataCard, QuestionLabelFormComponent, QuestionLabelsComponent, CityFormComponent, StatesComponent, StateFormComponent, EventCategoriesComponent, EventCategoryFormComponent,DahboardTypeComponent,DashboardTypeFormComponent,],
  imports: [
    CommonModule,
    CoreModule,
    BaseModule,
    ReferenceDataRoutingModule,
    MaterialModule,
    AngularFirestoreModule,
    CoreAdminModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ActivityTypeFormComponent, ConfirmationDialogComponent, QuestionTypeFormComponent, LocationTypeFormComponent, OrganizationTypeFormComponent, LanguageFormComponent, QuestionLabelFormComponent, CityFormComponent, StateFormComponent, EventCategoryFormComponent]
})
export class ReferenceDataModule {
}
