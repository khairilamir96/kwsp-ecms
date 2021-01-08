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
  selector: "app-sms",
  templateUrl: "sms.component.html"
})
export class SmsComponent {
  private opts = [
    { key: 'Registration', value: ['Member','Nomination','Simpanan Shariah'] },
    { key: 'Withdrawal', value: ['Application Status','Verification','Reminder','Calculation'] },
    { key: 'i-Akaun', value: ['Forgot Password','Withdrawal','Inverstment Scheme','TAC'] },
    { key: 'Events', value: [''] },
  ];
  
  firstSelectValue = 'one';
  secondSelectValue = null;

  get firstSelectOptions() {
    return this.opts.map(({key}) => key);
  }

  get secondSelectOptions() {
    return (this.opts.find(({key}) => key === this.firstSelectValue)).value
  }
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
      jobid: "1133",
      owner: "Amir",
      category: "Registration",
      type: "Member",
      transaction: "Auto",
      date: "22/12/2020",
      status: "Successful"
    },
    {
      jobid: "1122",
      owner: "Wan",
      category: "Withdrawal",
      type: "Application Status",
      transaction: "Manual",
      date: "11/11/2011",
      status: "Successful"
    },
    {
      jobid: "1234",
      owner: "Amin",
      category: "Registration",
      type: "Nomination",
      transaction: "2009/01/12",
      date: "23/3/2020",
      status: "Failed"
    },
    {
      jobid: "3321",
      owner: "Am",
      category: "Withdrawal",
      type: "Verification",
      transaction: "Auto",
      date: "11/1/2019",
      status: "Successful"
    },
    {
      jobid: "4444",
      owner: "Airi",
      category: "Withdrawal",
      type: "Reminder",
      transaction: "Auto",
      date: "2008/11/28",
      status: "Successful"
    },
    {
      jobid: "3131",
      owner: "Ali",
      category: "Withdrawal",
      type: "calculation",
      transaction: "Manual",
      date: "4/4/2020",
      status: "Failed"
    },
    {
      jobid: "4545",
      owner: "Abu",
      category: "i-Akaun",
      type: "Forgot Password",
      transaction: "Manual",
      date: "3/3/2019",
      status: "Successful"
    },
    {
      jobid: "7878",
      owner: "Afiq",
      category: "i-Akaun",
      type: "Withdrawal",
      transaction: "Manual",
      date: "12/12/2020",
      status: "Failed"
    },
    {
      jobid: "9991",
      owner: "Arif",
      category: "i-Akaun",
      type: "Investment Scheme",
      transaction: "Auto",
      date: "23/11/2020",
      status: "Successful"
    },
    {
      jobid: "1111",
      owner: "Afidz",
      category: "i-Akaun",
      type: "TAC",
      transaction: "Auto",
      date: "5/7/2019",
      status: "Successful"
    },
    {
      jobid: "2222",
      owner: "Asyraf",
      category: "Registration",
      type: "Member",
      transaction: "Auto",
      date: "5/6/2020",
      status: "Failed"
    },
    {
      jobid: "6666",
      owner: "Fadhli",
      category: "Registration",
      type: "Simpanan Shariah",
      transaction: "Auto",
      date: "6/1/2021",
      status: "Successful"
    },
    {
      jobid: "3345",
      owner: "Yoges",
      category: "Withdrawal",
      type: "Verification",
      transaction: "Manual",
      date: "12/12/2020",
      status: "Successful"
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

      // Add percent sign to all numbers
      chart.numberFormatter.numberFormat = "#.#'%'";

      // Add data
      chart.data = [{
          "country": "Mon",
          "year2004": 3.5,
          "year2005": 4.2
      }, {
          "country": "Tue",
          "year2004": 1.7,
          "year2005": 3.1
      }, {
          "country": "Wed",
          "year2004": 2.8,
          "year2005": 2.9
      }, {
          "country": "Thu",
          "year2004": 2.6,
          "year2005": 2.3
      }, {
          "country": "Fri",
          "year2004": 1.4,
          "year2005": 2.1
      }, {
          "country": "Sat",
          "year2004": 2.6,
          "year2005": 4.9
      }, {
        "country": "Sun",
        "year2004": 2.6,
        "year2005": 4.9
    }];

      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "country";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "GDP growth rate";

      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "year2004";
      series.dataFields.categoryX = "country";
      series.clustered = false;
      series.tooltipText = "{categoryX} (Manual): [bold]{valueY}[/]";

      let series2 = chart.series.push(new am4charts.ColumnSeries());
      series2.dataFields.valueY = "year2005";
      series2.dataFields.categoryX = "country";
      series2.clustered = false;
      series2.columns.template.width = am4core.percent(50);
      series2.tooltipText = "{categoryX} (Automatic): [bold]{valueY}[/]";

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineX.disabled = true;
      chart.cursor.lineY.disabled = true;

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

