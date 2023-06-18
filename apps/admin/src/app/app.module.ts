
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    //BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' })
  ],
  bootstrap: [AppComponent],
 /* providers: [
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ]*/
})
export class AppModule { }
