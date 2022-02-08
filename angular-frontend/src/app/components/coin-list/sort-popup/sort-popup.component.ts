import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MatButtonToggleChange} from "@angular/material/button-toggle";

@Component({
  selector: 'app-sort-popup',
  templateUrl: 'sort-popup.component.html',
  styleUrls: ['sort-popup.component.css']
})
export class SortPopupComponent {
  @Input() percentageOption: number = -1;
  @Output() percentageOptionChange = new EventEmitter<number>();

  @Input() periodOption: number = 1;
  @Output() periodOptionChange = new EventEmitter<number>();

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


  get options(): string[] {
    return Array.from(this._toggleOptions.keys());
  }

  get canSelectPeriod(): boolean {
    return this.percentageOption !== -1;
  }

  onPercentageChange(change: MatButtonToggleChange): void {
    if (change.value == 'now')
      this.percentageOption = 0;
    else
      this.percentageOption = this._toggleOptions.get(change.value) ?? -1;
    this.percentageOptionChange.emit(this.percentageOption);
  }

  onPeriodChange(change: MatButtonToggleChange): void {
    this.periodOption = this._toggleOptions.get(change.value) ?? 0;
    this.periodOptionChange.emit(this.periodOption);
  }
}
