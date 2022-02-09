import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from "@angular/core";
import { EChartsOption } from 'echarts'
import {Observable, Subscription} from "rxjs";
import {ChartData} from "../../../shared/chart-data.model";

@Component({
  selector: 'app-chart[data]',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() data!: Observable<ChartData>;

  private _updateSubscription!: Subscription;

  updateOptions: EChartsOption = {}
  chartOptions: EChartsOption = {}

  ngOnInit() {
      this._updateSubscription = this.data
        .subscribe(newData => {
            const dataSeries: any[] = [];
            newData.dataset.forEach(set => {
              dataSeries.push({
                data: set.data,
                name: set.name ?? '',
                type: 'line'
              })
            })

            this.chartOptions = {
              legend: {
                data: dataSeries.map(el => el.name),
              },
              xAxis: {
                type: 'category',
                data: newData.labels,
              },
              yAxis: {
                type: 'value',
              },
              tooltip: {},
              series: dataSeries,
              dataZoom: [
                {
                  type: 'slider',
                  xAxisIndex: 0,
                },
                {
                  type: 'slider',
                  yAxisIndex: 0,
                },
                {
                  type: 'inside',
                  xAxisIndex: 0,
                },
                {
                  type: 'inside',
                  yAxisIndex: 0,
                },
              ],
            }

        });
  }

  ngOnDestroy() {
    this._updateSubscription.unsubscribe();
  }
}
