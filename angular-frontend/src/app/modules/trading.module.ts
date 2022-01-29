import {NgModule} from "@angular/core";
import {TradingListComponent} from "../components/trading/trading-list/trading-list.component";
import {SharedModule} from "./shared.module";
import {TradingRoutingModule} from "./routes/trading.routing.module";
import {TradeItemComponent} from "../components/trading/trading-list/trade-item/trade-item.component";

@NgModule({
  declarations: [
    TradingListComponent,
    TradeItemComponent
  ],
  imports: [
    SharedModule,
    TradingRoutingModule
  ]
})
export class TradingModule {}
