import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// Import AngularFire libraries
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";

// Routing
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { LogoSectionComponent } from './shared/logo-section/logo-section.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostComponent } from './shared/post/post.component';
import { CreateComponent } from './pages/post/create/create.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CommentComponent } from './pages/post/comment/comment.component';
import { CommentFormComponent } from './pages/post/comment/comment-form.component';
import { PostViewComponent } from './pages/post/single-view/post-view/post-view.component';
import { ProfilePostViewComponent } from './pages/post/profile-post-view/profile-post-view.component';

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
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    LogoSectionComponent,
    SideBarComponent,
    PostComponent,
    CreateComponent,
    ProfileComponent,
    CommentComponent,
    CommentFormComponent,
    PostViewComponent,
    ProfilePostViewComponent
  ],
  imports: [
    BrowserModule,
    // Initialize Firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
