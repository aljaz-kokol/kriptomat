import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CoinDetailComponent} from "../../components/coin-list/coin-detail/coin-detail.component";
import {DeactivateGuard} from "../../services/guards/deactivate/deactivate.guard";
import {CoinDetailGuard} from "../../services/guards/activate/coin-detail.guard";
import {CoinGroupDetailGuard} from "../../services/guards/activate/coin-group-detail.guard";

const routes: Routes = [
  { path: '', children: [
      { path: ':coinId', component: CoinDetailComponent, canDeactivate: [DeactivateGuard], canActivate: [CoinDetailGuard] },
      { path: ':groupId/:coinId', component: CoinDetailComponent, canActivate: [CoinGroupDetailGuard] }
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
export class CoinDetailRoutingModule {}
