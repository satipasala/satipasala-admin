import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

declare var google: any;

@Component({
  selector: 's-gantt-chart',
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
export class SGanttChart implements AfterViewInit {

  @ViewChild('chart', {static: true}) elementRef: ElementRef;

  drawRegionsMap = () => {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Task ID');
    data.addColumn('string', 'Task Name');
    data.addColumn('string', 'Resource');
    data.addColumn('date', 'Start Date');
    data.addColumn('date', 'End Date');
    data.addColumn('number', 'Duration');
    data.addColumn('number', 'Percent Complete');
    data.addColumn('string', 'Dependencies');

    data.addRows([
      ['2014Spring', 'Spring 2014', 'spring',
        new Date(2014, 2, 22), new Date(2014, 5, 20), null, 100, null],
      ['2014Summer', 'Summer 2014', 'summer',
        new Date(2014, 5, 21), new Date(2014, 8, 20), null, 100, null],
      ['2014Autumn', 'Autumn 2014', 'autumn',
        new Date(2014, 8, 21), new Date(2014, 11, 20), null, 100, null],
      ['2014Winter', 'Winter 2014', 'winter',
        new Date(2014, 11, 21), new Date(2015, 2, 21), null, 100, null],
      ['2015Spring', 'Spring 2015', 'spring',
        new Date(2015, 2, 22), new Date(2015, 5, 20), null, 50, null],
      ['2015Summer', 'Summer 2015', 'summer',
        new Date(2015, 5, 21), new Date(2015, 8, 20), null, 0, null],
      ['2015Autumn', 'Autumn 2015', 'autumn',
        new Date(2015, 8, 21), new Date(2015, 11, 20), null, 0, null],
      ['2015Winter', 'Winter 2015', 'winter',
        new Date(2015, 11, 21), new Date(2016, 2, 21), null, 0, null],
      ['Football', 'Football Season', 'sports',
        new Date(2014, 8, 4), new Date(2015, 1, 1), null, 100, null],
      ['Baseball', 'Baseball Season', 'sports',
        new Date(2015, 2, 31), new Date(2015, 9, 20), null, 14, null],
      ['Basketball', 'Basketball Season', 'sports',
        new Date(2014, 9, 28), new Date(2015, 5, 20), null, 86, null],
      ['Hockey', 'Hockey Season', 'sports',
        new Date(2014, 9, 8), new Date(2015, 5, 21), null, 89, null]
    ]);

    var options = {
      height: 400,
      gantt: {
        trackHeight: 30
      }
    };


    var chart = new google.visualization.Gantt(this.elementRef.nativeElement);

    chart.draw(data, options);
  }

  ngAfterViewInit() {

    google.charts.load('current', {
      'packages': ['gantt'],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      'mapsApiKey': ''
    });
    google.charts.setOnLoadCallback(this.drawRegionsMap);
  }
}