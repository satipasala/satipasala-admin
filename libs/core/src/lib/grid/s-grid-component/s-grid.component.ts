import {
  Component,
  ContentChildren,
  ElementRef, EventEmitter,
  HostBinding,
  HostListener,
  Input, OnDestroy,
  OnInit, Output,
  QueryList
} from '@angular/core';
import {SElement} from "../../s-element";
import {SGridTile} from "../s-grid-tile/s-grid-tile.component";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subscription} from "rxjs";

@Component({
  selector: 's-grid',
  templateUrl: './s-grid.component.html',
  styleUrls: ['./s-grid.component.scss']
})
export class SGrid extends SElement implements OnInit,OnDestroy {
  @HostBinding("style.grid-template-areas") girdTemplate;


  @Input() lg;
  @Input() md;
  @Input() sm;
  // tslint:disable-next-line:no-input-rename
  @Input("x-sm") xsm;

  @Output() isMobile:EventEmitter<boolean> = new EventEmitter<boolean>();


  screenObserver:Subscription;

  /** Query list of tiles that are being rendered. */
  @ContentChildren(SGridTile, {descendants: true}) _tiles: QueryList<SGridTile>;

  constructor(public _element: ElementRef<HTMLElement>, private breakpointObserver: BreakpointObserver) {
    super(_element);
    this.screenObserver = this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge

    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        // handle XSmall breakpoint
        this.girdTemplate = this.xsm;
        this.isMobile.emit(true);
        //console.log("AAAAAE"+this.isMobile );

      }else if (result.breakpoints[Breakpoints.Small]) {
        // handle Small breakpoint
        this.girdTemplate = this.sm;

        //console.log("AAAAAD"+this.isMobile );
        // this.isSmall;
      }
      else if (result.breakpoints[Breakpoints.Medium]) {
        // handle Medium breakpoint
        this.girdTemplate = this.md;

        // console.log("AAAAAC"+this.isMobile );
        // this.isMedium;
      }
      else if (result.breakpoints[Breakpoints.Large]) {
        // handle Large breakpoint
        this.girdTemplate = this.lg;

        // console.log("AAAAAB"+this.isMobile );
        // this.isLarge;
      }
      else if (result.breakpoints[Breakpoints.XLarge]) {
        // handle XLarge breakpoint
        this.girdTemplate = this.lg;

        //console.log("AAAAA"+this.isMobile );
        //this.isXLarge;
      }
    });
  }

  ngOnInit() {


  }

  ngOnDestroy(): void {
    this.screenObserver.unsubscribe();
  }



}
