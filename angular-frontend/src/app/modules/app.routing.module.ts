import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "../app.component";
import {CoinGraphComponent} from "../components/coin-graph/coin-graph.component";
import {CoinListComponent} from "../components/coin-list/coin-list.component";

const routes: Routes = [
  { path: '', redirectTo: 'coin-list', pathMatch: 'full' },
  { path: 'coin-list', component: CoinListComponent },
  { path: 'coin-graph', children: [
      { path: ':name', component: CoinGraphComponent }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
