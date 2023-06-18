import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {AppModule} from "./app.module";
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {AngularFireFunctionsModule} from '@angular/fire/compat/functions';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireModule} from '@angular/fire/compat/';
import {environment} from 'environments/environment';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatSnackBarModule,
    AppModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {
}
