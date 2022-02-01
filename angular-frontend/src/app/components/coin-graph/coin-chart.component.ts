import {
  AfterViewChecked, AfterViewInit,
  Component,
  ElementRef, OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Coin} from "../../models/coin.model";
import {CoinService} from "../../services/coin.service";
import {Chart, ChartTypeRegistry, registerables} from "chart.js";

@Component({
  selector: 'app-coin-graph',
  templateUrl: 'coin-chart.component.html',
  styleUrls: [ 'coin-chart.component.css' ]
})
export class CoinChartComponent /*implements OnInit, AfterViewChecked*/ {
  // coin?: Coin;
  // chartCrated = false;
  // constructor(private _coinService: CoinService,
  //             private _route: ActivatedRoute) {
  //   Chart.register(...registerables)
  // }
  //
  // ngOnInit(): void {
  //   this._route.paramMap.subscribe(map => {
  //     const coinName: string = map.get('name') ?? '';
  //     this._coinService.getCoinByName(coinName).subscribe(coin => {
  //       this.coin = coin;
  //     });
  //   });
  // }
  //
  // ngAfterViewChecked(): void {
  //   if (this.coin && !this.chartCrated) {
  //     const basePrice = this.coin.prices[this.coin.prices.length - 1];
  //     const prices = this.coin.prices;
  //     CoinChartComponent._createCoinChart(
  //       'percentage_change',
  //       'Sprememba v odstotkih',
  //       this.coin,
  //       this.coin.prices.map((price, index) => {
  //         return ((100.0 * price / basePrice) - 100);
  //       })
  //     );
  //     CoinChartComponent._createCoinChart(
  //       'daily_change',
  //       'Dnevna sprememba',
  //       this.coin,
  //       this.coin.prices.map(
  //         (price, index) => {
  //           const lastDayPrice = this.coin?.prices[index - 258] ?? null
  //           if (lastDayPrice !== null)
  //             return ((price * 100 / basePrice) - 100) - ((lastDayPrice * 100 / basePrice) - 100);
  //           return(price * 100 / basePrice) - 100;
  //         })
  //     );
  //     this.chartCrated = true;
  //   }
  // }
  //
  // private static _createCoinChart(targetElId: string, title: string, coin: Coin, data: any[], type: keyof ChartTypeRegistry = 'line'): Chart {
  //   return new Chart(targetElId, {
  //     type: type,
  //     data: {
  //       labels: coin.dates,
  //       datasets: [{
  //         data: data,
  //         label:  coin.name
  //       }]
  //     },
  //     options: {
  //       plugins: {
  //         title: {
  //           display: true,
  //           text: title,
  //         }
  //       }
  //     }
  //   });
  // }
  //
  // get showSpinner(): boolean {
  //   return !this.coin;
  // }
}
