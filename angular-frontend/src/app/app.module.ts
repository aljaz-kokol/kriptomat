import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {AppRoutingModule} from "./modules/app.routing.module";
import {CoinGraphComponent} from "./components/coin-graph/coin-graph.component";
import {CoinListComponent} from "./components/coin-list/coin-list.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    AppComponent,
    CoinGraphComponent,
    CoinListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatTabsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
