import {NgModule} from "@angular/core";
import {SharedModule} from "./shared.module";
import {GroupListComponent} from "../components/group-list/group-list.component";
import {GroupListRoutingModule} from "./routes/group-list.routing.module";
import {GroupCardComponent} from "../components/group-list/group-card/group-card.component";

@NgModule({
  declarations: [
    GroupListComponent,
    GroupCardComponent
  ],
  imports: [
    SharedModule,
    GroupListRoutingModule
  ]
})
export class GroupListModule {}
