import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ListComponent } from './contacts/list/list.component';
import { CommonService } from './Shared/services/common.service';
import { AppStateServiceService } from './Shared/services/app-state-service.service';

@NgModule({
  declarations: [AppComponent, ListComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AgGridModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, CommonService, AppStateServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
