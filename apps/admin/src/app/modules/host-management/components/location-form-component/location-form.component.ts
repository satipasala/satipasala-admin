import { Component, OnInit, ViewChild, ViewRef, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { QuerySnapshot } from "@angular/fire/firestore";
import {FormField, HostsService, LocationsService, ReferenceDataService} from "@satipasala/base";

@Component({
  selector: 'admin-location-form-component',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form-component.scss']
})
export class LocationFormComponent implements OnInit {

  public isReadOnly;
  formMode: FormMode;
  locationId: string
  submitButtonText = 'Create'
  fields: FormField<any>[] = []

  constructor(private hostService: HostsService, private locationsService: LocationsService, private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private refDataService: ReferenceDataService) { }

  ngOnInit() {

    // Initialize form
    this.route.params.subscribe(params => {

      if (params.locationId === 'new') {
        this.formMode = FormMode.NEW;
        // Load form fields from ref data
        this.hostService.get(params.hostId).subscribe(host => {
          this.refDataService.getLocationTemplateByName(host.type.name).subscribe((templateQuerySnapshot: QuerySnapshot<any>) => {
            if (templateQuerySnapshot.docs) {
              const template = templateQuerySnapshot.docs[0].data()
              Object.keys(template).forEach((key, index) => {
                console.log(key)
                if (key !== 'host_type') {
                  let field = <FormField<string>>{
                    label: key,
                    type: 'text',
                    name: key,
                    order: index,
                    value: 'yyyy'
                  }
                  this.fields.push(field)
                }
              })
            }
          })
        },reason => console.error(reason))
      } else {
        this.submitButtonText = 'Update'
        this.locationsService.get(params.locationId).subscribe(location => {
          if (location) {
            // this.locationForm.patchValue(location)
            this.locationId = params.locationId;
          } else {
            console.error('Malformed location object')
          }
        },reason => console.error(reason));
      }
    });

    this.route.queryParams.subscribe(qParams => {
      if (qParams.noEdit == 'true') {
        this.isReadOnly = true;
      }
    });
  }

  onSubmit($event) {
    if (this.formMode == FormMode.NEW) {
      console.log($event)
      this.fields.forEach((field: FormField<any>) => {
        // const pair = {}
        // pair[field.label] = field.value
        // console.log(pair)
        // this.locationForm.patchValue(pair)
      })
      // this.locationsService.add(Object.assign({ createdAt: new Date().getTime() }, this.locationForm.value))
      //   .then(this.navigateToLocationsList)
      //   .catch(e => {
      //     console.log('Following error occurred when creating the location')
      //     console.error(e)
      //   });
    } else { // Update
      // this.locationsService.update(this.locationId, Object.assign({ updatedAt: new Date().getTime() }, this.locationForm.value))
      this.navigateToLocationsList()
    }
  }

  navigateToLocationsList(message?) {
    // this.router.navigate(["/" + HOST_MANAGEMENT_ROUTE + "/" + this.locationForm.controls['hostId'].value + "/location"]);
  }
}

export enum FormMode {
  NEW,
  VIEW,
  EDIT
}
