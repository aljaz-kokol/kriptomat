import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CoinListComponent} from "../../components/coin-list/coin-list.component";
import {CoinChartComponent} from "../../components/coin-graph/coin-chart.component";

const routes: Routes = [
  {path: '', children: [
      { path: ':id', component: CoinChartComponent }
  ]}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class CoinGraphRoutingModule {}
