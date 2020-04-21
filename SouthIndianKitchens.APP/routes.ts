import { HomeComponent } from './ClientApp/src/app/home/home.component';
import { AuthGuard } from './_gaurds/auth.guard';
import { AdminComponent } from './ClientApp/src/app/admin/admin.component';
import { Routes } from './ClientApp/node_modules/@angular/router';

export const appRoutes: Routes = [
    {path: '' , component: HomeComponent},
    {

        // Adding to protect the route
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children :
        [
                { path: 'home1', component: HomeComponent, },
                { path: 'Admin', component: AdminComponent},
        ]
    },
    { path: '**' , redirectTo: '', pathMatch: 'full'}
];
