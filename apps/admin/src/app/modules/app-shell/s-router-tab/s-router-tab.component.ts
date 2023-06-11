import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, ActivationEnd, Router} from "@angular/router";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {Navigation, NotificationService} from "@satipasala/base";

@Component({
  selector: 's-router-tab',
  templateUrl: './s-router-tab.component.html',
  styleUrls: ['./s-router-tab.component.scss'],
  changeDetection:ChangeDetectionStrategy.Default
})
export class SRouterTabComponent implements OnInit, OnChanges, AfterContentInit, AfterViewInit, OnDestroy {

  private _navigation: Navigation;
  @ViewChild(MatTabGroup, {static: true}) group;
  @ViewChildren(MatTab) tabs;

  get navigation(): Navigation {
    return this._navigation;
  }

  @Input()
  set navigation(value: Navigation) {
    this._navigation = value;
    if (this._navigation) {
      this.totalTabs = this._navigation.subCategory.length;
    }
    this.selectedIndex = 0;
    this.tabChanged(this.selectedIndex);
  }


  totalTabs = 0;
  SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

  selectedIndex = 0;

  constructor(private location: Location, private router: Router, private activatedRoute: ActivatedRoute, private notificationService: NotificationService) {
  }

  ngOnInit() {


    this.router.events.subscribe(val => {

      if (val instanceof ActivationEnd) {

        let index = this.getSelectedTabIndex(val.snapshot.outlet);
        if (index != null) {
          this.selectedIndex = index;
        }
      }
    });
  }

  swipe(eType) {
    console.log(eType);
    if (eType === this.SWIPE_ACTION.LEFT && this.selectedIndex > 0) {
      console.log("movin left")
      this.selectedIndex--;
    }
    else if (eType === this.SWIPE_ACTION.RIGHT && this.selectedIndex < this.totalTabs) {
      console.log("movin right")
      this.selectedIndex++;
    }
  }


  goBack() {

    this.location.back();
  }

  getSelectedTabIndex(outltName) {

    for (let i = 0; i < this._navigation.subCategory.length; i++) {
      if (outltName === this._navigation.subCategory[i].subCategoryLink) {
        return i;
      }
    }
    return undefined;
  }

  currentTab = 0;

  tabChanged(index: number) {
    // this.router.navigateByUrl(this._navigation.categoryLink + "/(" + this._navigation.subCategory[index].subCategoryLink + ":" + this._navigation.subCategory[index].subCategoryLink + ")");
    this.currentTab = index;
    this.router.navigateByUrl(this._navigation.categoryLink + "/" + this._navigation.subCategory[index].subCategoryLink)
      .then(value => console.log("navigation success",value)).catch(reason => this.notificationService.showErrorNotification("Error navigating", reason));
  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log("ngOnChanges")
  }


  ngAfterContentInit(): void {
    console.log("ngAfterContentInit")
  }


  ngAfterViewInit(): void {
    console.log("ngAfterViewInit")
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy")
  }
}
