import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './_services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './Upload/Upload.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AdminComponent } from './admin/admin.component';
import { ListsComponent } from './lists/lists.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { RegisterComponent } from './register/register.component';
import { EpisodeComponent } from './episode/episode.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { ImageSliderComponent } from './imageslider/imageslider.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { TabsModule } from 'ngx-bootstrap/tabs';

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
    SafeUrlPipe,
    ImageSliderComponent,
   ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    TabsModule.forRoot(),
     FormsModule,
     RouterModule.forRoot(appRoutes), NgImageSliderModule,
   ],
   providers: [
      AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
