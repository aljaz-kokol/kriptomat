import {NgModule} from "@angular/core";
import {SharedModule} from "./shared.module";
import {PurchasesComponent} from "../components/purchases/purchases.component";
import {PurchasesRoutingModule} from "./routes/purchases.routing.module";
import {PurchaseGraphComponent} from "../components/purchases/purchase-graph/purchase-graph.component";
import {PurchaseListComponent} from "../components/purchases/purchase-list/purchase-list.component";

@NgModule({
  declarations: [
    PurchasesComponent,
    PurchaseGraphComponent,
    PurchaseListComponent
  ],
  imports: [
    SharedModule,
    PurchasesRoutingModule
  ]
})
export class PurchasesModule {}
