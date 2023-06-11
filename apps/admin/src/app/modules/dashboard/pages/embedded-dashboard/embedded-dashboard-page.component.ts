import {Component, OnInit} from '@angular/core';
import {DashboardType} from "../../../../../../../../libs/base/src/lib/model/referencedata/DashboardType";
import {RefDataType, ReferenceDataService} from "@satipasala/base";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'admin-embedded-dashboard-page',
  templateUrl: './embedded-dashboard-page.component.html',
  styleUrls: ['./embedded-dashboard-page.component.scss']
})
export class EmbeddedDashboardPageComponent implements OnInit {
  dashboardType: DashboardType;

  constructor(private referenceDataService: ReferenceDataService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(path => {
      this.referenceDataService.getData<DashboardType>(RefDataType.DASHBOARD_TYPES, true)
        .subscribe(dashboardTypes => {
          this.dashboardType = dashboardTypes.filter(value => value.id == path.dashboardId)[0]
        })
    })

  }

  ngOnInit() {

  }


}
