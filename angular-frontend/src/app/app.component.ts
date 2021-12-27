import {Component, OnInit} from '@angular/core';
import {DataService} from "./services/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  coins: {name: string; days: {date: string; price: string}[]}[] = [];
  constructor(private _dataService: DataService) {}

  ngOnInit(): void {
    this.coins = this._dataService.getCoins();
  }
}
