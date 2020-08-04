import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component'
import { ListsComponent } from './lists/lists.component'
import { AuthGuard } from './_gaurds/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EpisodeComponent } from './episode/episode.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ReviewsComponent } from './reviews/reviews.compnent';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ManageImagesComponent } from './manageimages/manageimages.component';

export const appRoutes: Routes = [
  
  { path: '', component: HomeComponent },
  {
    // Adding to protect the route
    path: '',
    runGuardsAndResolvers: 'always',
    //canDeactivate: [AuthGuard]
    children:
      [
        { path: 'admin', component: AdminComponent, canActivate: [AuthGuard],},
        { path: 'lists', component: ListsComponent, canActivate: [AuthGuard],},
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'episode', component: EpisodeComponent },
        { path: 'recipe', component: RecipeComponent },
        { path: 'reviews', component: ReviewsComponent },
        { path: 'aboutus', component: AboutusComponent },
        { path: 'manage', component: ManageImagesComponent, canActivate: [AuthGuard], }
      ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
