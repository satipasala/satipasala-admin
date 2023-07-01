import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {
  Host,
  HostsService,
  Language,
  Location,
  LocationType,
  NotificationService,
  ObjectUtils,
  OrganizationType,
  RefDataType,
  ReferenceDataService,
  SidenavService
} from "@satipasala/base";
import {LocationSelectDialog} from "./location-select-dialog/location-select-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {RefData} from "../../../../../../../../libs/base/src/lib/model/referencedata/RefData";
import { v4 as uuidv4 } from 'uuid';
import {SpinnerOverlayService} from "@satipasala/base";

@Component({
  selector: 'admin-host-form',
  templateUrl: './host-form.component.html',
  styleUrls: ['./host-form.component.scss']
})
export class HostFormComponent implements OnInit {

  hostForm: FormGroup;
  host: Host;
  hostId: string;

  formTitle: string;
  hostTypeChangeHidden: boolean;
  submitBtnText: string;
  hostTypes: OrganizationType[];
  mediums: Language[];

  selectedOrganizationType: OrganizationType;

  //Variables for the search component
  collection: string = 'users';
  searchFields: string[] = ['displayName', 'id'];


  selectedLocationTypes: LocationType[] = [];
  locationList: Location[] = [];
  mode: "view"|"edit"|"add";

  constructor(private router: Router, private route: ActivatedRoute,
              private formBuilder: FormBuilder, private hostsService: HostsService, private referenceDataService: ReferenceDataService,
              public dialog: MatDialog, private sideNavService: SidenavService,
              private notificationService: NotificationService) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LocationSelectDialog, {
      width: '350px',
      height: '85%',
      data: {selectedHost: this.selectedOrganizationType, selectedItems: this.selectedLocationTypes}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedLocationTypes = result;
      }
    });
  }

  ngOnInit() {

    this.hostForm = this.formBuilder.group({
      id: [uuidv4(), Validators.required],
      name: ['', Validators.required],
      medium: ['', Validators.required],
      description: '',
      phone_number: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      business_reg_no: '',
      website: '',
      email: ['', Validators.email],
      type: ['', Validators.required],
      locations: [this.locationList],
      locationTypes: [this.selectedLocationTypes],
      personInChargeName: [''],
      personInChargeDesignation: [''],
      personInChargePhone: ['', Validators.pattern('[0-9]{10}')],
      personInChargeEmail: ['', Validators.email],
      coordinator1Name: [''],
      coordinator1Designation: [''],
      coordinator1Phone: ['', Validators.pattern('[0-9]{10}')],
      coordinator1Email: ['', Validators.email],
      coordinator2Name: [''],
      coordinator2Designation: [''],
      coordinator2Phone: ['', Validators.pattern('[0-9]{10}')],
      coordinator2Email: ['', Validators.email]
    });

    this.route.params.subscribe(params => {
      this.hostId = params.hostId;
      if (params.hostId === 'new') {
        this.submitBtnText = "Add";
        this.hostTypeChangeHidden = false;
        this.host = <Host>{};
      } else {
        this.submitBtnText = "Update";
        this.hostTypeChangeHidden = true;
        this.hostsService.getHost(params.hostId, this.setHost(this.hostForm));
      }
    });

    this.route.queryParams.subscribe(queryParams => {
        if (queryParams.action === "view") {
          this.mode = "view";
        } else if (queryParams.action === "edit") {
          this.mode = "edit";
        } else {
          this.mode = "add";
          this.formTitle = "New Organization Registration";
        }
      }
    );

    this.populateSelections();

  }

  setHost(form: FormGroup) {
    return host => {
      if (host) {
        console.log('host', host);
        this.host = host;
        this.formTitle = host.name;
        this.selectedOrganizationType = host.type;
        this.selectedLocationTypes = host.locationTypes;
        this.locationList = Object.values(host.locations);
        form.patchValue(host);
      } else {
        this.back();
      }
    };
  }

  compareItems(i1: RefData, i2: RefData): boolean {
    return i1 && i2 && i1.name === i2.name;
  }

  /**
   * Create/Update a host
   */
  addEditHost() {
    this.notificationService.startLoadingIndicator("updating");
    if (!this.hostForm.valid) {
      this.notificationService.showErrorNotification("Please fill all the required fields");
      return;
    }
    this.host = this.hostForm.value;
    this.host.disabled = false;
    const locations = {};
    //todo remove this part added to data consistency when all the locations are updated with location id.
    //move this to serverside.
    this.locationList.forEach((location) => {
        location.id = ObjectUtils.getLocationId(location, this.host);
        location.hostId = this.host.id;
        locations[location.id] = Object.assign({}, location);
      }
    );

    this.host.locations = locations;
    this.host.locationTypes = this.selectedLocationTypes.map((obj) => {
      return Object.assign({}, obj)
    });

    if (this.hostId === "new") {
      this.hostsService.add(this.host).then(() => {
        this.notificationService.showSuccessNotification("Organization is registered successfully");

        this.back();
      }).catch(err => {
        this.notificationService.showErrorNotification("Organization registration failed", err);
      })
    } else {
      this.hostsService.update(this.hostId, this.host).then(() => {
        this.notificationService.showSuccessNotification("Organization is updated successfully");
        this.back();
      }).catch(err => {
        this.notificationService.showErrorNotification("Organization update failed", err);
      })
    }
  }

  backToHostManage() {
    this.sideNavService.close();
  }

  populateSelections() {
    this.referenceDataService.getData<OrganizationType>(RefDataType.ORGANIZATION_TYPE, true).subscribe(dataArr => {
      this.hostTypes = dataArr;
    });

    this.referenceDataService.getData<Language>(RefDataType.LANGUAGE, false).subscribe(dataArr => {
      this.mediums = dataArr;
    });
  }

  addNewLocation(newItem: Location) {
    if (this.validateItem(newItem)) {
      this.locationList.push(newItem);
    } else {
      this.notificationService.showErrorNotification("Location already exists");
    }
  }

  deleteItem(location: Location) {
    this.locationList.splice(this.locationList.indexOf(location), 1);
  }

  enableItem(location: Location) {
    location.isDisabled = false;
    this.locationList[this.locationList.indexOf(location)] = location;
  }

  disableItem(location: Location) {
    location.isDisabled = true;
    this.locationList[this.locationList.indexOf(location)] = location;
  }

  validateItem(newItem: Location) {
    return !(this.locationList.filter(e => e.name === newItem.name && e.locationType.name === newItem.locationType.name).length > 0 ||
      newItem == null || newItem.name == null || newItem.description == null);
  }

  back() {
    this.sideNavService.close();
  }
}


