import {AbstractControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";

export class AutoCompleteUtil {

  public static filterConrol<T>(formControl: AbstractControl, values: T[]) {
    return formControl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filter(state, values) : values.slice())
      );
  }

  private static _filter(input: string, values: any[]): any[] {
    if (typeof input === "string") {
      const filterValue = input.toLowerCase();
      return values.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
    }

  }
}
