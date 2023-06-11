import {EventEmitter, Injectable} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private sidenav: MatSidenav;

  sideNavState: EventEmitter<boolean> = new EventEmitter<boolean>()

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open() {
    return this.sidenav.open();
  }

  public close() {
    return this.sidenav.close();
  }

  public toggle(): void {
    this.sidenav.toggle();
  }

  public setState(state: boolean) {
    this.sideNavState.emit(state);
  }


}
