import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {PriceService} from "../../../services/price.service";
import {CoinService} from "../../../services/coin.service";

@Component({
  selector: 'app-sort-popup',
  templateUrl: 'sort-popup.component.html',
  styleUrls: ['sort-popup.component.css']
})
export class SortPopupComponent implements OnInit {
  defaultPercentPeriod: string = '';
  @Output() percentagePeriodChange = new EventEmitter<number>();

  defaultTimePeriod: string = '2h';
  @Output() timePeriodChange = new EventEmitter<number>();

  private _toggleOptions = new Map<string, number>([
    ['2h', 1],
    ['4h', 2],
    ['12h', 6],
    ['1 day', 12],
    ['2 days', 24],
    ['3 days', 36],
    ['4 days', 48],
    ['5 days', 60],
    ['6 days', 72],
    ['1 week', 84],
    ['2 weeks', 168],
    ['3 weeks', 252],
    ['4 weeks', 336],
  ]);

  constructor(private _coinService: CoinService) {}

  ngOnInit() {
    this._toggleOptions.forEach((value: number, key: string) => {
      if (this._coinService.sortPeriods.percent == value)
        this.defaultPercentPeriod = key;
      if (this._coinService.sortPeriods.time == value)
        this.defaultTimePeriod = key;
    })
  }

  get options(): string[] {
    return Array.from(this._toggleOptions.keys());
  }


  onPercentageChange(change: MatButtonToggleChange): void {
    this.percentagePeriodChange.emit(this._toggleOptions.get(change.value) ?? 0);
  }

  onPeriodChange(change: MatButtonToggleChange): void {
    this.timePeriodChange.emit(this._toggleOptions.get(change.value) ?? 0);
  }
}
