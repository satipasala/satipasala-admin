import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

declare var google: any;

@Component({
  selector: 's-stepped-area-chart',
  template: `
    <div #chart></div>
    <style>
      :host {
        width: 100%;
        height: 100%;
        display: block;
      }

    </style>
  `
})
export class SSteppedAreaChart implements AfterViewInit {

  @ViewChild('chart', {static: true}) elementRef: ElementRef;

  drawRegionsMap = () => {


    const data = google.visualization.arrayToDataTable([
      ['Director (Year)', 'Rotten Tomatoes', 'IMDB'],
      ['Alfred Hitchcock (1935)', 8.4, 7.9],
      ['Ralph Thomas (1959)', 6.9, 6.5],
      ['Don Sharp (1978)', 6.5, 6.4],
      ['James Hawes (2008)', 4.4, 6.2]
    ]);

    const options = {
      title: 'The decline of \'The 39 Steps\'',
      vAxis: {title: 'Accumulated Rating'},
      isStacked: true
    };

    var chart = new google.visualization.SteppedAreaChart(this.elementRef.nativeElement);

    chart.draw(data, options);
  }

  ngAfterViewInit() {

    google.charts.load('current', {
      'packages': ['corechart'],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      'mapsApiKey': ''
    });
    google.charts.setOnLoadCallback(this.drawRegionsMap);
  }
}
