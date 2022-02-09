import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PurchasesComponent} from "../../components/purchases/purchases.component";

const routes: Routes = [
  { path: '', children: [
      { path: '', component: PurchasesComponent }
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
export class PurchasesRoutingModule {}
