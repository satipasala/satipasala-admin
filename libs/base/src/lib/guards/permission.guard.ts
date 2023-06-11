import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {UserClaimService} from "../services/user-claim.service";
import {NotificationService} from "../services/notificationService";


@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  user: any;

  constructor(
    private auth: AuthService,
    private userClaims: UserClaimService,
    private notificationService:NotificationService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let permission = next.data.permission;
    let type = next.data.type;

    return new Observable<boolean>(subscriber => {
      this.auth.getCurrentDbUser().toPromise().then(user => {
        if (permission && type) {
          if (user.userRole.allowedPermissions[permission][type]) {
            subscriber.next(true)
          } else {
            subscriber.next(false);
            this.notificationService.showErrorNotification("You dont have privileges to perform this action.")
          }
        } else {
          subscriber.next(true)
        }
      })
    })


    /**
     * Uncomment return this.userClaims.canAccess(route); to enable permission guard
     */
    //return this.userClaims.canAccess(route);
    //return true;
  }

}
