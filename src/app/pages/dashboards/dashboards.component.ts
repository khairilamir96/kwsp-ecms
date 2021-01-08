import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: "app-dashboards",
  templateUrl: "dashboards.component.html"
})
export class DashboardsComponent {
  todayString : string = new Date().toDateString();
  private chart: am4charts.XYChart;
  

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) {}

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  
  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("chartdiv", am4charts.XYChart);
      // Add data
      chart.data = [{
        "country": "Registration",
        "visits": 2025
      }, {
        "country": "App Status",
        "visits": 1882
      }, {
        "country": "Verification",
        "visits": 1809
      }, {
        "country": "Reminder",
        "visits": 1322
      }, {
        "country": "Calculation",
        "visits": 1122
      }, {
        "country": "Forgot Password",
        "visits": 1114
      }, {
        "country": "Withdrawal Submission",
        "visits": 984
      }, {
        "country": "Simpanan Shariah Registration",
        "visits": 711
      }, {
        "country": "Investment Scheme",
        "visits": 665
      }, {
        "country": "--akaun Registration",
        "visits": 580
      }, {
        "country": "TAC Number",
        "visits": 443
      }, {
        "country": "Events",
        "visits": 441
      }];

      // Create axes

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "country";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;


      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "visits";
      series.dataFields.categoryX = "country";
      series.name = "Visits";
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
      series.columns.template.fillOpacity = .8;

      let columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1;

    });

    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("chartdiv1", am4charts.PieChart);

      // Add data
      chart.data = [ {
        "country": "Registration",
        "litres": 501.9
      }, {
        "country": "Withdraw",
        "litres": 301.9
      }, {
        "country": "Online Platform",
        "litres": 201.1
      } ];

      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "litres";
      pieSeries.dataFields.category = "country";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;

    });

    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("chartdiv2", am4charts.PieChart);

      // Add data
      chart.data = [ {
        "country": "Successful",
        "litres": 501.9
      }, {
        "country": "Failed",
        "litres": 301.9
      }, {
        "country": "Scheduled",
        "litres": 201.1
      } ];

      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "litres";
      pieSeries.dataFields.category = "country";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;

    });
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("chartdiv3", am4charts.XYChart);
      // Add data
      chart.data = [{
        "country": "Week 1",
        "visits": 2025
      }, {
        "country": "Week 2",
        "visits": 1882
      }, {
        "country": "Week 3",
        "visits": 1809
      }, {
        "country": "Week 4",
        "visits": 1322
      }, {
        "country": "Week 5",
        "visits": 1122
      }, {
        "country": "Week 6",
        "visits": 1114
      }, {
        "country": "Week 7",
        "visits": 984
      }, {
        "country": "Week 8",
        "visits": 711
      }, {
        "country": "Week 9",
        "visits": 665
      }, {
        "country": "Week 10",
        "visits": 580
      }];
      // Create axes

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "country";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;


      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "visits";
      series.dataFields.categoryX = "country";
      series.name = "Visits";
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
      series.columns.template.fillOpacity = .8;

      let columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1;

    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
