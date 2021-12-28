import {NgModule} from "@angular/core";
import {SharedModule} from "./shared.module";
import {CoinGraphRoutingModule} from "./routes/coin-graph.routing.module";
import {CoinChartComponent} from "../components/coin-graph/coin-chart/coin-chart.component";
import {CoinListComponent} from "../components/coin-graph/coin-list/coin-list.component";
import {NgChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    CoinChartComponent,
    CoinListComponent
  ],
  imports: [
    SharedModule,
    NgChartsModule,
    CoinGraphRoutingModule
  ]
})
export class CoinGraphModule {}
