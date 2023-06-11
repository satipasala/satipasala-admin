import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Course, Host, Location, LocationType, ObjectUtils} from "@satipasala/base";
import {UserInfo} from "../../../../../../../../../libs/base/src/lib/model/User";

@Component({
  selector: 'location-create-form',
  templateUrl: './location-create-form.html',
  styleUrls: ['./location-create-form.scss']
})
export class LocationCreateForm {
  @Input() mode;
  @Input() locationType: LocationType;
  @Input() host:Host;
  @Output() onAddNewLocation: EventEmitter<Location> = new EventEmitter<Location>();

  name = new FormControl('', [Validators.required, Validators.nullValidator]);
  description = new FormControl('');

  constructor() {

  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name': '';

  }

  getDescriptionErrorMessage() {
    return  this.description.hasError('required') ? 'You must enter a description' : '';
  }

  addNewItem() {
    if( this.name.value == " "){
      return this.name.setValue(null);
    }else{
      const newLocation = this.createLocation();
      newLocation.name = this.name.value;
      newLocation.description = this.description.value;
      newLocation.locationType = this.locationType;
      newLocation.hostId = this.host.id;
      newLocation.id = ObjectUtils.getLocationId(newLocation,this.host);
      this.name.setValue(" ");
      this.description.setValue("");
      this.onAddNewLocation.emit(newLocation);
    }
  }

  isValied() {
    return this.name.valid && this.description.valid;
  }


  createLocation(): Location {
    return new class implements Location {
      courses: Course[];
      createdAt: Date;
      description: string;
      hostId: string;
      hostName: string;
      id: string;
      locationType: LocationType;
      name: string;
      students: any = {};
      teachers: UserInfo[];
      updatedAt: Date;
      isDisabled : boolean = false;
    };
  }

}
