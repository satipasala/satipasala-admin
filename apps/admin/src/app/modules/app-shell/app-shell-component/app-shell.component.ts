import {AfterViewInit, Component, Inject, LOCALE_ID, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router,} from "@angular/router";

import {SwUpdate} from "@angular/service-worker";
import {Location} from "@angular/common";
import {BreakpointObserver} from "@angular/cdk/layout";
import {NavList} from "./nav-list";
import {
  LoadingIndicatorService,
  Navigation,
  NavigationItem,
  NavigationService,
  RefDataType,
  ReferenceDataService,
  SidenavService
} from "@satipasala/base";
import {MatSidenav} from "@angular/material/sidenav";
import {DASHBOARD_ROUTE, EMBEDDED_DASHBOARDS_PREFIX} from "../../../app-routs";
import {DashboardType} from "../../../../../../../libs/base/src/lib/model/referencedata/DashboardType";

@Component({
  selector: 'admin-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnInit, AfterViewInit {

  title = 'Dashboard';
  //Sidenav responsive
  width;
  height;
  mode: 'over' | 'push' | 'side' = 'side';
  navOpened: boolean = true;
  navList: Navigation[];
  nav: Navigation;
  navActive: Navigation;
  //todo fix this is mobile resolution in a proper way.
  isMobileResolution: boolean;

  @ViewChild('mainNav', {static: false})
  viewChild: MatSidenav;

  @ViewChild('subNav', {static: false})
  subSideNav: MatSidenav;
  condition: string;

  showIndicator: boolean;//Show hide loading icon

  constructor(public ngZone: NgZone, private activatedRoute: ActivatedRoute,
              public router: Router,
              private updates: SwUpdate, @Inject(LOCALE_ID) public locale: string, private location: Location, private breakpointObserver: BreakpointObserver, private sidenavService: SidenavService, private loadingIndicatorService: LoadingIndicatorService, private navigationService: NavigationService, private referenceDataService: ReferenceDataService) {

    this.navList = NavList;
    const dashboadNavlist: NavigationItem[] = this.navList.filter(value => value.categoryLink === DASHBOARD_ROUTE)[0].subCategory;
    this.referenceDataService.getData<DashboardType>(RefDataType.DASHBOARD_TYPES, true)
      .subscribe(dashboardTypes => {
        dashboardTypes.forEach(dashboardType => {
          dashboadNavlist.push({
            subIcon: '',
            subCategoryName: dashboardType.name,
            subCategoryLink: EMBEDDED_DASHBOARDS_PREFIX+dashboardType.id,
            visible: true
          })
        })
      })

    this.navigationService.setNavList(this.navList);

    this.activatedRoute.params.subscribe(value => {
      console.log("Rouer:", value)
      this.selectRoute();
    })
  }

  selectRoute() {
    this.nav = this.navList[0];
  }


  /**
   * reload service worker cached resources when there is an update
   */
  reloeadUpdates() {
    this.updates.available.subscribe(() => {
      this.updates.activateUpdate().then(() => window.location.reload())
    })
  }

  ngOnInit() {
    this.reloeadUpdates();

    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.changeMode();
      });
    };
  }

  ngAfterViewInit() {
    this.changeMode();
    this.sidenavService.setSidenav(this.subSideNav);
    this.loadingIndicatorService.getSubject().subscribe(value => this.showIndicator = value);
    this.navigationService.getSubject().subscribe(value => this.setCurrentNavigation(value));
  }


  goBack() {

    this.location.back();
  }

  changeMode() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    if (this.width <= 800) {
      this.viewChild.close().then(value => {
        this.mode = 'over';
        this.isMobileResolution = true;
      })
    }
    if (this.width > 800) {
      this.viewChild.open().then(value => {
        this.mode = 'side';
        this.isMobileResolution = false;
      });
    }
  }

  leftSideBarActivated(subNav) {
    subNav.toggle()
    this.sidenavService.setSidenav(subNav)
  }

  leftSideBarDeActivated(end) {
    // end.toggle()
  }

  setCurrentNavigation(nav: Navigation) {
    this.nav = nav;
    this.navActive = nav;
    this.title = this.nav.categoryName;
    setTimeout(() => {
      this.changeMode()
    }, 300)

  }

  swipe(type: any) {

  }


  toggleMenu(mainNav: MatSidenav) {
    mainNav.toggle().then(value => this.sidenavService.setState(mainNav.opened)).catch(reason => {
      console.error("Toggle failed")
    })

  }

  getMenuButtonId(nav) {
    return nav.categoryName.trim().split(' ').join('_').toLowerCase();
  }
}




