import {NgModule} from "@angular/core";
import {SharedModule} from "./shared.module";
import {CoinListRoutingModule} from "./routes/coin-list.routing.module";
import {CoinDetailComponent} from "../components/coin-list/coin-detail/coin-detail.component";
import {CoinGraphComponent} from "../components/coin-list/coin-detail/coin-graph/coin-graph.component";
import {DateSelectorComponent} from "../components/coin-list/coin-detail/date-selector/date-selector.component";
import {CoinAddPopupComponent} from "../components/coin-list/coin-detail/coin-add-popup/coin-add-popup.component";
import {CoinHeaderComponent} from "../components/coin-list/coin-detail/coin-header/coin-header.component";
import {CoinTabComponent} from "../components/coin-list/coin-detail/coin-header/coin-tab/coin-tab.component";
import {
  PercentageGraphComponent
} from "../components/coin-list/coin-detail/coin-graph/percentage-graph/percentage-graph.component";
import {CoinDetailRoutingModule} from "./routes/coin-detail.routing.module";

@NgModule({
  declarations: [
    CoinDetailComponent,
    CoinGraphComponent,
    DateSelectorComponent,
    PercentageGraphComponent,
    CoinAddPopupComponent,
    CoinTabComponent,
    CoinHeaderComponent
  ],
  imports: [
    SharedModule,
    CoinDetailRoutingModule,
  ]
})
export class CoinDetailModule {}
