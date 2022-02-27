import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {ChartData} from "../../../shared/chart-data.model";
import {LegendPosition, ScaleType, ViewDimensions} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-chart[data]',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() data!: Observable<ChartData>;
  private _updateSubscription!: Subscription;

  dataSeries: any = [];
  legendPosition = LegendPosition.Right;
  scaleType = ScaleType.Ordinal;

  colorScheme = [
    {name: 'base', value: '#000000'}
  ];



  ngOnInit() {
    this._updateSubscription = this.data
      .subscribe(newData => {
        let baseCreated = false;
        this.dataSeries = [];
        const baseSetSeries: any[] = [];
        for (const set of newData.dataset) {
            const series: any[] = [];

            set.data.forEach((value, index) => {
              const labelIndex = index < newData.labels.length ? index : newData.labels.length - 1;
              const date = new Date(newData.labels[labelIndex]);
              const dateStr = date.toLocaleDateString().split('.').map(datePart => datePart.trim().padStart(2, '0')).join ('.');
              const timeStr = date.toLocaleTimeString();
              series.push({
                name: date,
                value: value ?? 0,
                tooltipText: `${dateStr} ${timeStr}`
              });
              if (!baseCreated) {
                baseSetSeries.push({
                  name: date,
                  value: 0
                })
              }
            })
            baseCreated = true;
            this.dataSeries.push({
              name: set.name ?? '',
              series: series
            });
        }
        this.dataSeries.push({
          name: 'base',
          series: baseSetSeries,
        })
      });
  }


  ngOnDestroy() {
    this._updateSubscription.unsubscribe();
  }
}
