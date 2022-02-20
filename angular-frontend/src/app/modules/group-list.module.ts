import {NgModule} from "@angular/core";
import {SharedModule} from "./shared.module";
import {GroupListComponent} from "../components/group-list/group-list.component";
import {GroupListRoutingModule} from "./routes/group-list.routing.module";
import {GroupCardComponent} from "../components/group-list/group-card/group-card.component";
import {GroupSettingsComponent} from "../components/group-list/group-settings/group-settings.component";

@NgModule({
  declarations: [
    GroupListComponent,
    GroupCardComponent,
    GroupSettingsComponent,
  ],
  imports: [
    SharedModule,
    GroupListRoutingModule
  ]
})
export class GroupListModule {}
