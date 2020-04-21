import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component'
import { ListsComponent } from './lists/lists.component'
import { AuthGuard } from './_gaurds/auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  {

    // Adding to protect the route
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children:
      [
        { path: 'admin', component: AdminComponent },
        { path: 'lists', component: ListsComponent },
      ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
