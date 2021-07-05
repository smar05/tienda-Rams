import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const firebaseConfig = {
  apiKey: "AIzaSyDeMvM7BVia6Ah8fj3MTjqbtnYM_fkoPf8",
  authDomain: "mipavi-ae497.firebaseapp.com",
  databaseURL: "https://mipavi-ae497.firebaseio.com",
  projectId: "mipavi-ae497",
  storageBucket: "mipavi-ae497.appspot.com",
  messagingSenderId: "876186897951",
  appId: "1:876186897951:web:fe2a2dd749a54e90540f2a",
  measurementId: "G-E031Q5WWXP"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    //NgbModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
