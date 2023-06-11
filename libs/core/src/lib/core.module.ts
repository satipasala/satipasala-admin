import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SDragDropList,} from './drag-drop/s-drag-drop-list/s-drag-drop-list.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {A11yModule} from "@angular/cdk/a11y";
import {CdkStepperModule} from "@angular/cdk/stepper";
import {CdkTreeModule} from "@angular/cdk/tree";
import {CdkTableModule} from "@angular/cdk/table";
import {SGrid} from './grid/s-grid-component/s-grid.component';
import {MaterialModule} from "../../../../apps/admin/src/app/imports/material.module";
import {SChip} from './chip/s-chip/s-chip.component';
import {SDragDropListItem} from "./drag-drop/s-drag-drop-list-item/s-drag-drop-list-item.component";
import {SChipList} from "./chip/s-chip-list/s-chip-list.component";
import {SGridTile} from './grid/s-grid-tile/s-grid-tile.component';

import {CarouselSliderComponent} from "./carousel-slider/carousel-slider.component";
import {CarouselModule} from "ngx-owl-carousel-o";
import {DynamicFormComponent} from "./dynamic-forms/dynamic-form-component/dynamic-form.component";
import {CheckBoxComponent} from "./dynamic-forms/fields/check-box/check-box.component";
import {DropDownComponent} from "./dynamic-forms/fields/drop-down/drop-down.component";
import {RadioComponent} from "./dynamic-forms/fields/radio/radio.component";
import {TextBoxComponent} from "./dynamic-forms/fields/text-box/text-box.component";
import {FieldBuilderComponent} from "./dynamic-forms/field-builder/field-builder.component";
import {InputComponent} from "./dynamic-forms/fields/input/input.component";
import {SFieldError} from "./dynamic-forms/field-error/s-field-error.component";
import {
  FormFieldCustomControlExample,
  MyTelInput
} from "./dynamic-forms/fields/example-tel-input/example-tel-input.component";
import {SSelectionListComponent} from "./dynamic-forms/fields/s-selection-list/s-selection-list.component";
import {DynamicStepperForm} from "./dynamic-forms/dynamic-stepper-form-component/dynamic-stepper-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ErrorStateMatcherFactory} from "./dynamic-forms/services/ErrorStateMatcherFactory";
import {SSearchBoxComponent} from './search-box/s-search-box.component';

import {SQuestionnaireForm} from "./questions/questionnaire-form/s-questionnaire-form.component";
import {SQuestionComponent} from "./questions/question/s-question.component";
import {BaseModule} from "@satipasala/base";
import {SInfiniteScrollGrid} from "./infinite-scroll/infinite-scroll-grid/infinite-scroll-grid.component";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {SSelectBoxComponent} from "./select-box/s-select-box.component";

@NgModule({
  declarations: [SQuestionnaireForm, SQuestionComponent,
    SDragDropList, SDragDropListItem, SGrid, SChip, SChipList, SGridTile, CarouselSliderComponent,
    DynamicFormComponent,
    CheckBoxComponent, DropDownComponent, RadioComponent, TextBoxComponent, FieldBuilderComponent, InputComponent,
    SFieldError, MyTelInput, FormFieldCustomControlExample, SSelectionListComponent, DynamicStepperForm, SSearchBoxComponent,SSelectBoxComponent, SInfiniteScrollGrid],
  imports: [
    CommonModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MaterialModule,
    MatInputModule,
    CarouselModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    BaseModule,
    ScrollingModule
  ],
  exports: [SQuestionnaireForm, SQuestionComponent,
    SDragDropList, SDragDropListItem, SGrid, SChip, SChipList, SGridTile, CarouselSliderComponent,
    DynamicFormComponent, DynamicStepperForm, SSearchBoxComponent,SSelectBoxComponent, SInfiniteScrollGrid]
  ,
  providers: [
    ErrorStateMatcherFactory,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'auto'}}
  ],
})
export class CoreModule {
}
