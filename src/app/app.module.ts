import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { Geolocation } from '@ionic-native/geolocation';
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { PlayPage } from '../pages/play/play';
import { DetailPage } from '../pages/detail/detail';
import { StatsPage } from '../pages/stats/stats';

import { TabsPage } from '../pages/tabs/tabs';
import { DataComponent } from '../components/data/data';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BdKduinoProvider } from '../providers/bd-kduino/bd-kduino';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlayPage,
    DetailPage,
    StatsPage,
    TabsPage,
    DataComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'db_kduino',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlayPage,
    DetailPage,
    StatsPage,
    TabsPage,
    DataComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Dialogs,
    Geolocation,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BdKduinoProvider
  ]
})
export class AppModule {}
