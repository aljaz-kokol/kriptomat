import {NgModule} from "@angular/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {NgxEchartsModule} from "ngx-echarts";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatDialogModule} from "@angular/material/dialog";
import { MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  exports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    NgxEchartsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonToggleModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule
  ]
})
export class MaterialModule {}
