import {ElementRef} from "@angular/core";
import {AbstractSElement} from "./abstract-s-element";
export class SElement extends AbstractSElement{
  constructor(public _element: ElementRef<HTMLElement>) {
    super();

  }

  /** Sets style on the main element, given the style name and value. */
  _setListStyle(style: [string, string | null] | null): void {
    if (style) {
      (this._element.nativeElement.style as any)[style[0]] = style[1];
    }
  }

  /**
   * Sets the style of the gelement.  Needs to be set manually to avoid
   * "Changed after checked" errors that would occur with HostBinding.
   */
  _setStyle(property: string, value: any): void {
    (this._element.nativeElement.style as any)[property] = value;
  }



}
