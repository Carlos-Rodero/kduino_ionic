import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { PlayPage } from '../pages/play/play';
import { DetailPage } from '../pages/detail/detail';
import { AboutPage } from '../pages/about/about';

import { TabsPage } from '../pages/tabs/tabs';
import { DataComponent } from '../components/data/data';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlayPage,
    DetailPage,
    AboutPage,
    TabsPage,
    DataComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlayPage,
    DetailPage,
    AboutPage,
    TabsPage,
    DataComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Dialogs,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
