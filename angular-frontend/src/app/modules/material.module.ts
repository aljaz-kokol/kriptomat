import {NgModule} from "@angular/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {NgxEchartsModule} from "ngx-echarts";
import {MatTabsModule} from "@angular/material/tabs";

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
    MatTabsModule
  ]
})
export class MaterialModule {}
