import {Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {SElement} from "../../s-element";

@Component({
  selector: 's-grid-tile',
  templateUrl: './s-grid-tile.component.html',
  styleUrls: ['./s-grid-tile.component.scss'],

})


export class SGridTile extends SElement implements OnInit {
  @HostBinding("style.grid-area")
  @Input() gridArea:string;


  constructor(public _element: ElementRef<HTMLElement>) {
    super(_element);

  }


  ngOnInit() {
   // this._setStyle("grid-area",this.gridArea);

  }


}
