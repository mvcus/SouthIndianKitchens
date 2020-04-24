import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component'
import { ListsComponent } from './lists/lists.component'
import { AuthGuard } from './_gaurds/auth.guard';
import { LoginComponent } from './login/login.component';

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
        { path: 'login', component: LoginComponent},
      ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
