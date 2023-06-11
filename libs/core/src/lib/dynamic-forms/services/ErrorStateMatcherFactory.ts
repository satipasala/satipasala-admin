import {Injectable} from "@angular/core";
import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

@Injectable()
export class ErrorStateMatcherFactory {

  errorStateMap:Map<string,ErrorStateMatcher> = new Map();

  constructor() {
    this.errorStateMap.set("errorStateMatcher",new SatiErrorStateMatcher());
  }


  getErrorStateMatcher(stateName:string):ErrorStateMatcher{
    return this.errorStateMap.get(stateName);
  }


}


export class SatiErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
