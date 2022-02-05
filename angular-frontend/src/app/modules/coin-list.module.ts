import {CoinListComponent} from "../components/coin-list/coin-list.component";
import {NgModule} from "@angular/core";
import {SharedModule} from "./shared.module";
import {CoinListRoutingModule} from "./routes/coin-list.routing.module";
import {CoinCardComponent} from "../components/coin-list/coin-card/coin-card.component";
import {LongClickDirective} from "../directives/long-click.directive";

@NgModule({
  declarations: [
    CoinListComponent,
    CoinCardComponent,
    LongClickDirective,
  ],
  imports: [
    SharedModule,
    CoinListRoutingModule,
  ]
})
export class CoinListModule {}
