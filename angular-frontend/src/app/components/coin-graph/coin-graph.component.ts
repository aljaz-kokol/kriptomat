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
import {Chart, registerables} from "chart.js";

@Component({
  selector: 'app-coin-graph',
  templateUrl: 'coin-graph.component.html',
  styleUrls: [ 'coin-graph.component.css' ]
})
export class CoinGraphComponent implements OnInit, AfterViewChecked {
  coin?: Coin;
  chartCrated = false;
  constructor(private _coinService: CoinService,
              private _route: ActivatedRoute) {
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(map => {
      const coinName: string = map.get('name') ?? '';
      this._coinService.getCoinByName(coinName).subscribe(coin => {
        this.coin = coin;
      });
    });
  }

  ngAfterViewChecked(): void {
    if (this.coin && !this.chartCrated) {
      const basePrice = this.coin.prices[this.coin.prices.length - 1];
      new Chart('percentage_change', {
        type: 'line',
        data: {
          labels: this.coin?.dates,
          datasets: [
            {data: this.coin?.prices.map(price => (price * 100 / basePrice) - 100), label: this.coin.name}
          ]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Sprememba v odstotkih'
            }
          }
        }
      });
      new Chart('daily_change', {
        type: 'line',
        data: {
          labels: this.coin?.dates,
          datasets: [
            {data: this.coin?.prices.map(
              (price, index) => {
                const lastDayPrice = this.coin?.prices[index - 258] ?? null
                if (lastDayPrice)
                  return ((price * 100 / basePrice) - 100) - ((lastDayPrice * 100 / basePrice) - 100);
                return(price * 100 / basePrice) - 100;
              }), label: this.coin.name}
          ]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Dnevna sprememba'
            }
          }
        }
      });
      this.chartCrated = true;
    }
  }

  get showSpinner(): boolean {
    return !this.coin;
  }
}
