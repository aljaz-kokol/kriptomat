import {CoinListComponent} from "../components/coin-list/coin-list.component";
import {NgModule} from "@angular/core";
import {SharedModule} from "./shared.module";
import {CoinListRoutingModule} from "./routes/coin-list.routing.module";
import {CoinCardComponent} from "../components/coin-list/coin-card/coin-card.component";

@NgModule({
  declarations: [
    CoinListComponent,
    CoinCardComponent
  ],
  imports: [
    SharedModule,
    CoinListRoutingModule,
  ]
})
export class CoinListModule {}
