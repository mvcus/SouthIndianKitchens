/// <reference path="recpie/filterrecpie.pipe.ts" />
import { AuthService } from './_services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AdminComponent } from './admin/admin.component';
import { ListsComponent } from './lists/lists.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { RegisterComponent } from './register/register.component';
import { EpisodeComponent } from './episode/episode.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { UploadImageService } from './_services/upload-image.service';
import { UploadComponent } from './Upload/Upload.component';
import { ImageDetailComponent } from './recpie/Recpie-Details.component';
import { FilterimagesPipe } from './recpie/filterrecpie.pipe';
import { RecpieComponent } from './recpie/recpie.component';
import { ImageService } from './recpie/image.service';
import { ReviewsComponent } from './reviews/reviews.compnent';
import { AboutusComponent } from './aboutus/aboutus.component';

@NgModule({
   declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UploadComponent,
    NavMenuComponent,
    AdminComponent,
    ListsComponent,
    RegisterComponent,
    EpisodeComponent,
    RecpieComponent,
    ReviewsComponent,
    AboutusComponent,
    ImageDetailComponent,
    FilterimagesPipe,
    SafeUrlPipe
   ],
   imports: [
    BrowserModule,
     HttpClientModule,
     
    FormsModule,
     RouterModule.forRoot(appRoutes),
     
   ],
   providers: [
     AuthService,
     UploadImageService,
     ImageService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
