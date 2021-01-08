import { Component, Inject, NgZone, PLATFORM_ID,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { isPlatformBrowser } from '@angular/common';
export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox"
}
@Component({
  selector: "app-subscriber",
  templateUrl: "subscriber.component.html"
})
export class SubscriberComponent {
  todayString : string = new Date().toDateString();
  //modal
  dismissible = true;

  defaultModal: BsModalRef;
  default = {
    keyboard: true,
    class: "modal-dialog-centered"
  };
  private chart: am4charts.XYChart;
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
    {
      phone: "0134351122",
      telco: "Celcom",
      dateregistered: "12/12/2020",
      inactive: "40"
    },
    {
      phone: "0134351454",
      telco: "TM",
      dateregistered: "12/11/2020",
      inactive: "11"
    },
    {
      phone: "0134311456",
      telco: "Maxis",
      dateregistered: "12/10/2020",
      inactive: "30"
    },
    {
      phone: "01454956454",
      telco: "Digi",
      dateregistered: "12/7/2020",
      inactive: "40"
    },
    {
      phone: "0199314123",
      telco: "Celcom",
      dateregistered: "3/3/2020",
      inactive: "50"
    },
    {
      phone: "0135567889",
      telco: "Umobile",
      dateregistered: "5/4/2020",
      inactive: "60"
    },
    {
      phone: "0122324567",
      telco: "Celcom",
      dateregistered: "7/7/2020",
      inactive: "50"
    },
    {
      phone: "0167898990",
      telco: "Celcom",
      dateregistered: "4/4/2020",
      inactive: "21"
    },
    {
      phone: "0134541211",
      telco: "Celcom",
      dateregistered: "8/9/2020",
      inactive: "50"
    },
    {
      phone: "0134351122",
      telco: "Digi",
      dateregistered: "12/9/2020",
      inactive: "40"
    }
  ];
  
  SelectionType = SelectionType;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,private modalService: BsModalService) {
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key
      };
    });
  }
  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function(d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  onActivate(event) {
    this.activeRow = event.row;
  }
  //modal
  openDefaultModal(modalDefault: TemplateRef<any>) {
  this.defaultModal = this.modalService.show(modalDefault, this.default);
  }
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
        "country": "Malaysia",
        "visits": 2025
      }, {
        "country": "Asian",
        "visits": 1882
      }, {
        "country": "Europe",
        "visits": 1809
      }, {
        "country": "North America",
        "visits": 1322
      }, {
        "country": "South America",
        "visits": 1122
      }, {
        "country": "Australia",
        "visits": 1114
      }, {
        "country": "Africa",
        "visits": 984
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
        "country": "Active",
        "litres": 501.9
      }, {
        "country": "Non Active",
        "litres": 301.9
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
        "country": "Maxis",
        "litres": 501.9
      }, {
        "country": "Celcom",
        "litres": 301.9
      }, {
        "country": "Digi",
        "litres": 201.1
      },
      {
        "country": "Umobile",
        "litres": 201.1
      },
      {
        "country": "TM",
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

