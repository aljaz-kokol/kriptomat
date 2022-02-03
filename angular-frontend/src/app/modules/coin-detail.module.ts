import {NgModule} from "@angular/core";
import {SharedModule} from "./shared.module";
import {CoinListRoutingModule} from "./routes/coin-list.routing.module";
import {CoinDetailComponent} from "../components/coin-list/coin-detail/coin-detail.component";
import {PriceListComponent} from "../components/coin-list/coin-detail/price-list/price-list.component";
import {PriceGraphComponent} from "../components/coin-list/coin-detail/price-graph/price-graph.component";
import {DateSelectorComponent} from "../components/coin-list/coin-detail/date-selector/date-selector.component";

@NgModule({
  declarations: [
    CoinDetailComponent,
    PriceListComponent,
    PriceGraphComponent,
    DateSelectorComponent
  ],
  imports: [
    SharedModule,
    CoinListRoutingModule,
  ]
})
export class CoinDetailModule {}
