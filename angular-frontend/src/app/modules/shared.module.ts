import {NgModule} from "@angular/core";
import {MaterialModule} from "./material.module";
import {CommonModule} from "@angular/common";
import {SearchBarComponent} from "../components/shared/search-bar/search-bar.component";
import {SpinnerComponent} from "../components/shared/spinner/spinner.component";
import {ChartComponent} from "../components/shared/chart/chart.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {FormsModule} from "@angular/forms";
import {OverlayComponent} from "../components/shared/overlay/overlay.component";
import {PopupComponent} from "../components/shared/popup/popup.component";
import {ChoiceDialogComponent} from "../components/shared/dialog/choice-dialog/choice-dialog.component";
import {LayoutModule} from "@angular/cdk/layout";
import {InputDialogComponent} from "../components/shared/dialog/input-dialog/input-dialog.component";

@NgModule({
  declarations: [
    SearchBarComponent,
    SpinnerComponent,
    ChartComponent,
    OverlayComponent,
    PopupComponent,
    ChoiceDialogComponent,
    InputDialogComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    MaterialModule,
    CommonModule,
    DragDropModule,
    LayoutModule,
    SearchBarComponent,
    SpinnerComponent,
    FormsModule,
    ChartComponent,
    OverlayComponent,
    PopupComponent,
    ChoiceDialogComponent,
    InputDialogComponent
  ]
})
export class SharedModule {}
