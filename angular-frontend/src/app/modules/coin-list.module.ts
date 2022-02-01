import {CoinListComponent} from "../components/coin-list/coin-list.component";
import {NgModule} from "@angular/core";
import {SharedModule} from "./shared.module";
import {CoinListRoutingModule} from "./routes/coin-list.routing.module";
import {CoinCardComponent} from "../components/coin-list/coin-card/coin-card.component";
import {CoinDetailComponent} from "../components/coin-list/coin-detail/coin-detail.component";
import {PriceListComponent} from "../components/coin-list/coin-detail/price-list/price-list.component";

@NgModule({
  declarations: [
    CoinListComponent,
    CoinCardComponent,
    CoinDetailComponent,
    PriceListComponent
  ],
  imports: [
    SharedModule,
    CoinListRoutingModule
  ]
})
export class CoinListModule {}
