import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './_services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
import { ImageDetailComponent } from './recipe/Recpie-Details.component';
import { FilterimagesPipe } from './recipe/filterrecpie.pipe';
import { RecipeComponent } from './recipe/recipe.component';
import { ImageService } from './recipe/image.service';
import { ReviewsComponent } from './reviews/reviews.compnent';
import { AboutusComponent } from './aboutus/aboutus.component';
import { UploadImageService } from './_services/upload-image.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


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
    RecipeComponent,
    ReviewsComponent,
    AboutusComponent,
    ImageDetailComponent,
    FilterimagesPipe,
    HeaderComponent,
    FooterComponent
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
    AuthService,
    UploadImageService,
    ImageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }  
