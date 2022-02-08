import {CoinListComponent} from "../components/coin-list/coin-list.component";
import {NgModule} from "@angular/core";
import {SharedModule} from "./shared.module";
import {CoinListRoutingModule} from "./routes/coin-list.routing.module";
import {CoinCardComponent} from "../components/coin-list/coin-card/coin-card.component";
import {SortPopupComponent} from "../components/coin-list/sort-popup/sort-popup.component";

@NgModule({
  declarations: [
    CoinListComponent,
    CoinCardComponent,
    SortPopupComponent
  ],
  imports: [
    SharedModule,
    CoinListRoutingModule,
  ]
})
export class CoinListModule {}
