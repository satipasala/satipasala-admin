import {Injectable, Inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {NotifyService} from "../services/notify.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private notify: NotifyService) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.auth.isUserLoggedIn().then(loggedIn => {
        if (!loggedIn) {
          this.unAuthorized();
          reject();
        } else {
          resolve(true)
        }
      }).catch(reason => {
        this.unAuthorized()
        reject()
      })
    })
  }

  unAuthorized() {
    console.log('Access denied');
    this.notify.update('You must be logged in!', 'error');
    this.router.navigate(['login']);
  }

}
