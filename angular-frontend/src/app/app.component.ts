import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CoinService} from "./services/coin.service";
import {PriceService} from "./services/price.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _priceService: PriceService) {}

  ngOnInit() {
    this._priceService.fetchAllPrices();
  }
}
