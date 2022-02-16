import {
  Component, ElementRef,
  Input, NgZone,
  OnDestroy,
  OnInit, ViewChild
} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {ChartData} from "../../../shared/chart-data.model";
import {LegendPosition, ViewDimensions} from "@swimlane/ngx-charts";

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

  ngOnInit() {
    this._updateSubscription = this.data
      .subscribe(newData => {
        this.dataSeries = [];
        for (const set of newData.dataset) {
            const series: {name: Date, value: any}[] = [];

            set.data.forEach((value, index) => {
              const labelIndex = index < newData.labels.length ? index : newData.labels.length - 1;
              series.push({
                name: new Date(newData.labels[labelIndex]),
                value: value ?? 0
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
