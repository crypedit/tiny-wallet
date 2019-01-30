import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TransactionIndex } from './../pages/transaction/index';
import { TransactionPage } from './../pages/transaction/page';
import { ApiProvider } from '../providers/api/api';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { QueryPageModule } from '../pages/query/query.module';
import { ImportPageModule } from '../pages/import/import.module';
import { MnenomicPageModule } from '../pages/mnenomic/mnenomic.module';
import { RememberPageModule } from '../pages/remember/remember.module';
import { AuthenticationProvider } from '../providers/authentication/authentication';

@NgModule({
  declarations: [MyApp, TransactionIndex, TransactionPage, HomePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    QueryPageModule,
    ImportPageModule,
    MnenomicPageModule,
    RememberPageModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'websql', 'localstorage']
    })
  ],
bootstrap: [IonicApp],
  entryComponents: [MyApp, TransactionIndex, TransactionPage, HomePage],
    providers: [
      StatusBar,
      SplashScreen,
      { provide: ErrorHandler, useClass: IonicErrorHandler },
      ApiProvider,
      AuthenticationProvider
    ]
})
export class AppModule { }
