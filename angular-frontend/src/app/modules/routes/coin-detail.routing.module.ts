import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CoinDetailComponent} from "../../components/coin-list/coin-detail/coin-detail.component";
import {DeactivateGuard} from "../../services/guards/deactivate/deactivate.guard";

const routes: Routes = [
  { path: '', children: [
      { path: ':id', component: CoinDetailComponent, canDeactivate: [DeactivateGuard] }
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
