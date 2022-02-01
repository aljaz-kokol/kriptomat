import {RouterModule, Routes} from "@angular/router";
import {CoinListComponent} from "../../components/coin-list/coin-list.component";
import {NgModule} from "@angular/core";
import {CoinDetailComponent} from "../../components/coin-list/coin-detail/coin-detail.component";

const routes: Routes = [
  { path: '', children: [
      { path:  '', component: CoinListComponent },
      { path: ':id', component: CoinDetailComponent }
  ]},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CoinListRoutingModule {}
