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

  ngOnInit() {
    this._updateSubscription = this.data
      .subscribe(newData => {
        this.dataSeries = [];
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
              })
            })

            this.dataSeries.push({
              name: set.name ?? '',
              series: series
            })
        }
      });
  }


  ngOnDestroy() {
    this._updateSubscription.unsubscribe();
  }
}
