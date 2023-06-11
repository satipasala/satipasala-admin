import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {path: '', loadChildren: () => import('./modules/app-shell/app-shell.module').then(m => m.AppShellModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
