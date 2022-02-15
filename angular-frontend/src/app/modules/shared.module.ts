import {NgModule} from "@angular/core";
import {MaterialModule} from "./material.module";
import {CommonModule} from "@angular/common";
import {SearchBarComponent} from "../components/shared/search-bar/search-bar.component";
import {SpinnerComponent} from "../components/shared/spinner/spinner.component";
import {ChartComponent} from "../components/shared/chart/chart.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { ReactiveFormsModule} from "@angular/forms";
import {OverlayComponent} from "../components/shared/overlay/overlay.component";
import {PopupComponent} from "../components/shared/popup/popup.component";
import {ChoiceDialogComponent} from "../components/shared/dialog/choice-dialog/choice-dialog.component";
import {LayoutModule} from "@angular/cdk/layout";
import {ActionDialogComponent} from "../components/shared/dialog/action-dialog/action-dialog.component";
import {
  InputConfirmDialogComponent
} from "../components/shared/dialog/input-confirm-dialog/input-confirm-dialog.component";

@NgModule({
  declarations: [
    SearchBarComponent,
    SpinnerComponent,
    ChartComponent,
    OverlayComponent,
    PopupComponent,
    ChoiceDialogComponent,
    ActionDialogComponent,
    InputConfirmDialogComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    LayoutModule,
    SearchBarComponent,
    SpinnerComponent,
    ChartComponent,
    OverlayComponent,
    PopupComponent,
    ChoiceDialogComponent,
    ActionDialogComponent,
    InputConfirmDialogComponent
  ]
})
export class SharedModule {}
