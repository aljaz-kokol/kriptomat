import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', redirectTo: 'trading', pathMatch: 'full' },
  { path: 'coin-graph', loadChildren: () => import('../coin-graph.module').then(module => module.CoinGraphModule) },
  { path: 'trading', loadChildren: () => import('../trading.module').then(module => module.TradingModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
