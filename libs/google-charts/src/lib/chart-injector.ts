import {Inject, Injectable, Injector} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {ReplaySubject} from "rxjs";
@Injectable()
export class ChartInjector {
  chartLoaded:ReplaySubject<boolean> = new ReplaySubject<boolean>();
  constructor(@Inject(DOCUMENT) private document: HTMLDocument,@Inject('environment') protected environment) {
    const _this = this;
    window["googleMapsLoad"] = function () {
      _this.chartLoaded.next(true);
      _this.chartLoaded.complete();
    };
    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = "//maps.googleapis.com/maps/api/js?callback=googleMapsLoad&key="+environment.googleCharts.mapsApiKey;
    document.head.appendChild(script);
  }


}
