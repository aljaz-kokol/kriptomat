import {Component} from "@angular/core";
import {PriceService} from "../../../../services/price.service";

@Component({
  selector: 'app-date-selector',
  templateUrl: 'date-selector.component.html',
  styleUrls: ['date-selector.component.css']
})
export class DateSelectorComponent {
  selectedDates: string[] = [];

  constructor(private _priceService: PriceService) {}

  get days(): string[] {
    return this._priceService.days;
  }

  get months(): string[] {
    return  this._priceService.months;
  }

  get years(): string[] {
    return  this._priceService.years;
  }

  onDayDateSelected(date: string): void {
    // If array contains dates that are not day dates clear it
    if (this.selectedDates.length > 0 && this.selectedDates[0].split('.').length !== 3)
      this.selectedDates = [];
    this._addDate(date);
  }

  onMothDateSelected(date: string): void {
    // If array contains dates that are not day dates clear it
    if (this.selectedDates.length > 0 && this.selectedDates[0].split('.').length !== 2)
      this.selectedDates = [];
    this._addDate(date);
  }

  onYearDateSelected(date: string): void {
    // If array contains dates that are not day dates clear it
    if (this.selectedDates.length > 0 && this.selectedDates[0].split('.').length !== 1)
      this.selectedDates = [];
    this._addDate(date);
  }

  private _addDate(date: string): void {
    const dateIndex = this.selectedDates.indexOf(date);
    // If date already exists remove it
    if (dateIndex >= 0) {
      this.selectedDates.splice(dateIndex, 1);
    } else {
      this.selectedDates.push(date);
    }
    this._priceService.filterByDate(this.selectedDates);
  }
}
