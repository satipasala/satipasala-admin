import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

declare var google: any;

@Component({
  selector: 's-org-chart',
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
export class SOrgChart implements AfterViewInit {

  @ViewChild('chart', {static: true}) elementRef: ElementRef;

  drawRegionsMap = () => {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    data.addColumn('string', 'ToolTip');

    // For each orgchart box, provide the name, manager, and tooltip to show.
    data.addRows([
      [{'v': 'Mike', 'f': 'Mike<div style="color:red; font-style:italic">President</div>'},
        '', 'The President'],
      [{'v': 'Jim', 'f': 'Jim<div style="color:red; font-style:italic">Vice President</div>'},
        'Mike', 'VP'],
      ['Alice', 'Mike', ''],
      ['Bob', 'Jim', 'Bob Sponge'],
      ['Carol', 'Bob', '']
    ]);

    var options = {'allowHtml': true}

    var chart = new google.visualization.OrgChart(this.elementRef.nativeElement);

    chart.draw(data, options);
  }

  ngAfterViewInit() {

    google.charts.load('current', {
      'packages': ['orgchart'],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      'mapsApiKey': ''
    });
    google.charts.setOnLoadCallback(this.drawRegionsMap);
  }
}
