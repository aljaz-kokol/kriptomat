import {NgModule} from "@angular/core";
import {MaterialModule} from "./material.module";
import {CommonModule} from "@angular/common";
import {NgChartsModule} from "ng2-charts";
import {SearchBarComponent} from "../components/shared/search-bar/search-bar.component";

@NgModule({
  declarations: [
    SearchBarComponent
  ],
  imports: [
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    CommonModule,
    SearchBarComponent
  ]
})
export class SharedModule {}
