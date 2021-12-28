import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TradingListComponent} from "../../components/trading/trading-list/trading-list.component";

const routes: Routes = [
  { path: '', children: [
      { path: '', component: TradingListComponent }
  ]}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TradingRoutingModule {}
