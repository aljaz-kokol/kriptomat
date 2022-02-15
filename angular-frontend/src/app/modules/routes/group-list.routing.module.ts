import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {GroupListComponent} from "../../components/group-list/group-list.component";
import {GroupSettingsComponent} from "../../components/group-list/group-settings/group-settings.component";
import {GroupSettingsGuard} from "../../services/guards/activate/group-settings.guard";
import {DeactivateGuard} from "../../services/guards/deactivate/deactivate.guard";

const routes: Routes = [
  {path: '', children: [
      { path: '', component: GroupListComponent },
      { path: 'settings/:id', component: GroupSettingsComponent, canActivate: [ GroupSettingsGuard ], canDeactivate: [ DeactivateGuard ] }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class GroupListRoutingModule {}
