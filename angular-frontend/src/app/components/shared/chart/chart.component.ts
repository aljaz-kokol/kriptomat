import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from "@angular/core";
import { EChartsOption, ECharts } from 'echarts'
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-chart[data]',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() data!: Observable<{data: any[], labels: any[]}>;

  private _updateSubscription!: Subscription;

  chartOptions: EChartsOption = {}
  updateOptions: EChartsOption = {}

  ngOnInit() {
      this._updateSubscription = this.data
        .subscribe(newData => {
          this.chartOptions = {
            xAxis: {
              type: 'category',
              data: newData.labels,
            },
            yAxis: {
              type: 'value',
            },
            series: [
              {
                data: newData.data,
                type: 'line',
              },
            ],
          }
        });
  }

  ngOnDestroy() {
    this._updateSubscription.unsubscribe();
  }
}
