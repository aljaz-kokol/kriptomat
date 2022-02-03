import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CoinListComponent} from "../../components/coin-list/coin-list.component";

const routes: Routes = [
  { path: '', component: CoinListComponent},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CoinDetailRoutingModule {}
