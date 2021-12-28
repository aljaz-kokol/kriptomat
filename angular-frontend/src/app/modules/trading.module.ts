import {NgModule} from "@angular/core";
import {TradingListComponent} from "../components/trading/trading-list/trading-list.component";
import {SharedModule} from "./shared.module";
import {TradingRoutingModule} from "./routes/trading.routing.module";

@NgModule({
  declarations: [
    TradingListComponent,
  ],
  imports: [
    SharedModule,
    TradingRoutingModule
  ]
})
export class TradingModule {}
