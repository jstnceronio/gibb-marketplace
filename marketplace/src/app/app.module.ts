import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// Import AngularFire libraries
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// Routing 
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './pages/login/login.component';

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
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    // Initialize Firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
