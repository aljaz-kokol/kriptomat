import {RouterModule, Routes} from "@angular/router";
import {CoinListComponent} from "../../components/coin-list/coin-list.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  { path: '', component: CoinListComponent }
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
