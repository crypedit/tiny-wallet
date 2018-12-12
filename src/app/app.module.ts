import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TransactionIndex } from './../pages/transaction/index';
import { TransactionPage } from './../pages/transaction/page';
import { ApiProvider } from '../providers/api/api';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { QueryPageModule } from '../pages/query/query.module';
import { ImportPageModule } from '../pages/import/import.module';

@NgModule({
  declarations: [MyApp, TransactionIndex, TransactionPage, HomePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    QueryPageModule,
    ImportPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, TransactionIndex, TransactionPage, HomePage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiProvider
  ]
})
export class AppModule {}
