import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from "@angular/core";
import { EChartsOption } from 'echarts'
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-chart[data]',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() data!: Observable<{dataset: {data: any[]; name?: string}[]; labels: string[]}>;

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
              xAxis: {
                type: 'category',
                data: newData.labels,
              },
              yAxis: {
                type: 'value',
              },
              tooltip: {},
              series: dataSeries,
            }

        });
  }

  ngOnDestroy() {
    this._updateSubscription.unsubscribe();
  }
}
