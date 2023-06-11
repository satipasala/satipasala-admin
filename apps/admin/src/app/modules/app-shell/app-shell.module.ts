import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppShellRoutingModule} from './app-shell-routing.module';
import {AppShellComponent} from "./app-shell-component/app-shell.component";
import {UserLoginPageComponent} from "./pages/login-page/user-login-page.component";
import {BrowserTransferStateModule} from "@angular/platform-browser";

import {AuthGuard, AuthService, BaseModule, PermissionGuard, SidenavService, UserClaimService} from "@satipasala/base";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CoreAdminModule} from "../core/core-admin.module";
import {CoreModule} from "@satipasala/core";
import {SRouterTabComponent} from './s-router-tab/s-router-tab.component';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";

import {QuestionnaireModule} from "../questionnaire/questionnaire.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {SpinnerOverlayComponent} from "@satipasala/base";
import {PrivacyPolicyPageComponent} from "./pages/privacy-policy-page/privacy-policy-page.component";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";

@NgModule({
  declarations: [AppShellComponent, UserLoginPageComponent, SRouterTabComponent,PrivacyPolicyPageComponent],

  imports: [
    // AngularFireStorageModule,
    // AngularFireFunctionsModule,
    // AngularFontAwesomeModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    CommonModule,
    CoreAdminModule,
    CoreModule,
    BaseModule,
    BrowserTransferStateModule,
    AppShellRoutingModule,
    QuestionnaireModule,//todo remove questionnaire module from here
    // AngularFireAuthModule,
    // AngularFirestoreModule,
    // AngularFireModule.initializeApp(environment.firebase),
  ],
  bootstrap:[AppShellComponent],
  providers: [AngularFireAuth, AuthService, AuthGuard, UserClaimService, PermissionGuard, SidenavService,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  entryComponents: [SpinnerOverlayComponent],

})
export class AppShellModule {


  constructor(private angularFirestore: AngularFirestore) {
    /*this.configureLocalCache();*/
  }

  private configureLocalCache() {
    //TODO: Enable below to disable firestore cache limit (default: 40MB)
    // this.angularFirestore.firestore.settings({
    //   cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
    // });

    this.angularFirestore.firestore.enablePersistence({synchronizeTabs: true}).then(response => {
      console.info("Offline access enabled!");
    }).catch(err => {
      if (err.code == 'failed-precondition') {
        console.error("Multiple tabs open, persistence can only be enabled in one tab at a a time");
      } else if (err.code == 'unimplemented') {
        console.error("The current browser does not support all of the features required to enable persistence");
      }
    });
  }

}
