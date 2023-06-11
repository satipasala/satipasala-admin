import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

declare var google: any;

@Component({
  selector: 's-timeline-chart',
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
export class STimelineChart implements AfterViewInit {

  @ViewChild('chart', {static: true}) elementRef: ElementRef;

  drawRegionsMap = () => {


    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Room' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    dataTable.addRows([
      [ 'Magnolia Room',  'CSS Fundamentals',    new Date(0,0,0,12,0,0),  new Date(0,0,0,14,0,0) ],
      [ 'Magnolia Room',  'Intro JavaScript',    new Date(0,0,0,14,30,0), new Date(0,0,0,16,0,0) ],
      [ 'Magnolia Room',  'Advanced JavaScript', new Date(0,0,0,16,30,0), new Date(0,0,0,19,0,0) ],
      [ 'Gladiolus Room', 'Intermediate Perl',   new Date(0,0,0,12,30,0), new Date(0,0,0,14,0,0) ],
      [ 'Gladiolus Room', 'Advanced Perl',       new Date(0,0,0,14,30,0), new Date(0,0,0,16,0,0) ],
      [ 'Gladiolus Room', 'Applied Perl',        new Date(0,0,0,16,30,0), new Date(0,0,0,18,0,0) ],
      [ 'Petunia Room',   'Google Charts',       new Date(0,0,0,12,30,0), new Date(0,0,0,14,0,0) ],
      [ 'Petunia Room',   'Closure',             new Date(0,0,0,14,30,0), new Date(0,0,0,16,0,0) ],
      [ 'Petunia Room',   'App Engine',          new Date(0,0,0,16,30,0), new Date(0,0,0,18,30,0) ]]);

    var options = {
      timeline: { colorByRowLabel: true },
      backgroundColor: '#ffd'
    };
    var chart = new google.visualization.Timeline(this.elementRef.nativeElement);

    chart.draw(dataTable, options);
  }

  ngAfterViewInit() {

    google.charts.load('current', {
      'packages': ['timeline'],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      'mapsApiKey': ''
    });
    google.charts.setOnLoadCallback(this.drawRegionsMap);
  }
}
