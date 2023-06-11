import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

declare var google: any;

@Component({
  selector: 's-scatter-chart',
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
export class SScatterChart implements AfterViewInit {

  @ViewChild('chart', {static: true}) elementRef: ElementRef;

  drawRegionsMap = () => {
    var data = google.visualization.arrayToDataTable([
      ['Age', 'Weight'],
      [8, 12],
      [4, 5.5],
      [11, 14],
      [4, 5],
      [3, 3.5],
      [6.5, 7]
    ]);

    var options = {
      title: 'Age vs. Weight comparison',
      hAxis: {title: 'Age', minValue: 0, maxValue: 15},
      vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
      legend: 'none'
    };


    const chart = new google.visualization.ScatterChart(this.elementRef.nativeElement);

    chart.draw(data, options);
  }

  ngAfterViewInit() {
    google.charts.load('current', {'packages': ['corechart'], 'mapsApiKey': ''});
    google.charts.setOnLoadCallback(this.drawRegionsMap);
  }
}
