import {ElementRef} from "@angular/core";

export abstract class AbstractSElement {


  /** Sets style on the main element, given the style name and value. */
  abstract _setListStyle(style: [string, string | null] | null): void;

  /**
   * Sets the style of the gelement.  Needs to be set manually to avoid
   * "Changed after checked" errors that would occur with HostBinding.
   */
  abstract _setStyle(property: string, value: any): void ;
}
