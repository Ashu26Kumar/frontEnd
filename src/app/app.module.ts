import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import {MatCardModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {DataService} from "./data.service";
import {MatPaginatorModule} from '@angular/material/paginator';
import {HttpClientModule} from '@angular/common/http';
import {ChartsModule} from 'ng2-charts';
import {MatIconModule} from '@angular/material/icon';
//import { ChartComponent } from './chart/chart.component';
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FormComponent,
    //ChartComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,ChartsModule,
    AppRoutingModule,BrowserAnimationsModule,MatCardModule,MatPaginatorModule,MatIconModule,FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
