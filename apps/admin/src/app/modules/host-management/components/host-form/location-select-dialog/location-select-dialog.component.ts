import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Inject} from "@angular/core";
import {LocationType, NavigationService, NotificationService, OrganizationType, SidenavService} from "@satipasala/base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {REFERENCE_DATA_LOCATION_TYPE_ROUTE, REFERENCE_DATA_ROUTE} from "../../../../../app-routs";

@Component({
  selector: 'location-select-dialog',
  templateUrl: './location-select-dialog.html',
  styleUrls: ['./location-select-dialog.component.scss']
})
export class LocationSelectDialog {

  orgType: OrganizationType;
  selectedOptions: OrganizationType[] = [];

  constructor(private cdRef: ChangeDetectorRef, public dialogRef: MatDialogRef<LocationSelectDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any, private rouer: Router, private navigationService: NavigationService,
              private sideNavService:SidenavService,private notificationService:NotificationService) {
    this.orgType = data.selectedHost;
    this.selectedOptions = data.selectedItems;
  }


  compareItems(i1: OrganizationType, i2: OrganizationType): boolean {
    return i1 && i2 && i1.name === i2.name;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setSelectedList(): void {
    this.dialogRef.close(this.selectedOptions);
  }

  navigateToRefData() {
    this.sideNavService.close().then(value => {
      this.navigationService.navigateToSubCategory(REFERENCE_DATA_ROUTE, REFERENCE_DATA_LOCATION_TYPE_ROUTE);
    }).catch(reason => {
      this.notificationService.showErrorNotification("Navigation to reference data")
    });

  }


}
