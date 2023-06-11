import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import {TranslationRoutingModule} from './translation-routing.module';
import {TranslationPage} from './pages/translation-page/translation-page.component';
import {MaterialModule} from "../../imports/material.module";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {GlossaryTableComponent} from './components/glossary-table/glossary-table.component';
import {ContextMenuComponent} from './components/context-menu/context-menu.component';
import {CoreModule} from "@satipasala/core";
import {BaseModule} from "@satipasala/base";


@NgModule({
  declarations: [TranslationPage, GlossaryTableComponent, ContextMenuComponent],
  imports: [
    CommonModule,
    MaterialModule,
    // TranslationRoutingModule,
    AngularFireModule,
    AngularFirestoreModule,
    CoreModule,
    BaseModule
  ]
})
export class TranslationModule {
}
