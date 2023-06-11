import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {OverviewPageComponent} from './pages/overview/overview-page.component';
import {LayoutModule} from '@angular/cdk/layout';
import {CoreAdminModule} from "../core/core-admin.module";
import {CoreModule} from "@satipasala/core";
import {BaseModule} from "@satipasala/base";
import {GoogleChartsModule} from "@satipasala/google-charts";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {GoogleMapComponentComponent} from './components/google-map-component/google-map-component.component';
import {DashboardCardComponentComponent} from './components/dashboard-card-component/dashboard-card-component.component';
import {EventMaleFemaleChart} from "./events/event-male-female-chart/event-male-female-chart.component";
import {EventAdultsChildrenChart} from "./events/event-adaults-children-chart/event-adults-children-chart.component";
import {EventHistogramChart} from "./events/event-histogram-chart/event-histogram-chart.component";
import {EventOverviewPageComponent} from "./pages/event-dashboard/event-overview-page.component";
import {EventMap} from "./events/event-map/event-map.component";
import {EventGeoChart} from "./events/event-geo-chart/event-geo-chart.component";
import {MatTabsModule} from "@angular/material/tabs";
import {EventFilter} from "./events/event-filter/event-filter.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {EventCategoryChart} from "./events/event-categroy-chart/event-category-chart.component";
import {EventActivitiesChart} from "./events/event-activities-chart/event-activities-chart.component";
import {EventCoursesChart} from "./events/event-courses-chart/event-courses-chart.component";
import {EventsDashboardService} from "./events/events-dashboard.service";
import {environment} from "../../../environments/environment";
import {EmbeddedDashboardPageComponent} from "./pages/embedded-dashboard/embedded-dashboard-page.component";

@NgModule({
  declarations: [OverviewPageComponent, EventOverviewPageComponent, GoogleMapComponentComponent, DashboardCardComponentComponent,
    EventMaleFemaleChart, EventMap, EventGeoChart, EventAdultsChildrenChart, EventHistogramChart, EventFilter, EventCategoryChart,
    EventActivitiesChart, EventCoursesChart,EmbeddedDashboardPageComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    CoreAdminModule,
    CoreModule,
    BaseModule,
    GoogleChartsModule.forRoot(environment),
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers:[EventsDashboardService]
})
export class DashboardModule {
}
