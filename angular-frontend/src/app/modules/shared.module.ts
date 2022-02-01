import {NgModule} from "@angular/core";
import {MaterialModule} from "./material.module";
import {CommonModule} from "@angular/common";
import {NgChartsModule} from "ng2-charts";
import {SearchBarComponent} from "../components/shared/search-bar/search-bar.component";
import {SpinnerComponent} from "../components/shared/spinner/spinner.component";

@NgModule({
  declarations: [
    SearchBarComponent,
    SpinnerComponent
  ],
  imports: [
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    CommonModule,
    SearchBarComponent,
    SpinnerComponent
  ]
})
export class SharedModule {}
