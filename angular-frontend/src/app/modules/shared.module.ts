import {NgModule} from "@angular/core";
import {MaterialModule} from "./material.module";
import {CommonModule} from "@angular/common";
import {NgChartsModule} from "ng2-charts";

@NgModule({
  imports: [
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    CommonModule,
  ]
})
export class SharedModule {}
