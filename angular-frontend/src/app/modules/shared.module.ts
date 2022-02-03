import {NgModule} from "@angular/core";
import {MaterialModule} from "./material.module";
import {CommonModule} from "@angular/common";
import {SearchBarComponent} from "../components/shared/search-bar/search-bar.component";
import {SpinnerComponent} from "../components/shared/spinner/spinner.component";
import {ChartComponent} from "../components/shared/chart/chart.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    SearchBarComponent,
    SpinnerComponent,
    ChartComponent
  ],
  imports: [
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    CommonModule,
    DragDropModule,
    SearchBarComponent,
    SpinnerComponent,
    ChartComponent
  ]
})
export class SharedModule {}
