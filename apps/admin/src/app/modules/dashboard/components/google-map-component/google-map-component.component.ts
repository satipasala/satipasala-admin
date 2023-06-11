import {Component, OnInit} from '@angular/core';
import {GeoLocation, HostsService} from "@satipasala/base";
import {ChartInjector} from "@satipasala/google-charts";
import { CityInfo } from 'libs/base/src/lib/model/referencedata/City';
import {ChartColumn} from "../../../../../../../../libs/google-charts/src/lib/s-chart";
import {Observable, ReplaySubject} from "rxjs";

@Component({
  selector: 'admin-google-map-component',
  templateUrl: './google-map-component.component.html',
  styleUrls: ['./google-map-component.component.scss']
})
export class GoogleMapComponentComponent implements OnInit {
  data: ReplaySubject<any[][]> = new ReplaySubject();
  _markers:any[][] = [];
  titles: ChartColumn[];
  constructor(private hostService: HostsService) {
    this.titles = [
      {type: 'number', label: 'Lat'},
      {type: 'number', label: 'Long'},
      {type: 'string', label: 'City'}];
  }

  ngOnInit() {
      // Show all the hosts in map
      this.hostService.getAll().subscribe(hostArr => {
        // Get geo locations
        for (const host of hostArr) {
          if (host && host.addressInfo && host.addressInfo.city.geoLocation) {
            this.createMarker(host.addressInfo.city, host.addressInfo.city.name);
          }
        }
        this.data.next(this._markers);
        this.data.complete();
      });
  }


  createMarker(cityInfo: CityInfo, title: string) {
    this._markers.push([
      Number(cityInfo.geoLocation.latitude),
      Number(cityInfo.geoLocation.longitude),
      title]);

  }

}
