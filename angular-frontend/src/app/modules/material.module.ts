import {NgModule} from "@angular/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  exports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatTabsModule,
  ]
})
export class MaterialModule {}
