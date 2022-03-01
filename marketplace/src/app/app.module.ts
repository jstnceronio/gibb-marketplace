import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAVaaVZgiDCOLY7GOyVtsqEYlcstEqCKA4",
  authDomain: "gibb-marketplace.firebaseapp.com",
  projectId: "gibb-marketplace",
  storageBucket: "gibb-marketplace.appspot.com",
  messagingSenderId: "637376662704",
  appId: "1:637376662704:web:5d667adc1c5241711f7f75",
  measurementId: "G-L2Q8M4YPKB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
