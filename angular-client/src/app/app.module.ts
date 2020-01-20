import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import adapter from 'webrtc-adapter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { PeersComponent } from './peers/peers.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PeersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
