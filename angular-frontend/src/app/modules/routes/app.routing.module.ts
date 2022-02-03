import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', redirectTo: 'coin-list', pathMatch: 'full' },
  { path: 'coin-list', loadChildren: () => import('../coin-list.module').then(module => module.CoinListModule) },
  { path: 'coin', loadChildren: () => import('../coin-detail.module').then(module => module.CoinDetailModule) },
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
