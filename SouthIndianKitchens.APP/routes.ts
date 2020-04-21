import { Home1Component } from './ClientApp/src/app/home1/home1.component';
import { AuthGuard } from './_gaurds/auth.guard';
import { AdminComponent } from './ClientApp/src/app/admin/admin.component';
import { Routes } from './ClientApp/node_modules/@angular/router';

export const appRoutes: Routes = [
    {path: '' , component: Home1Component},
    {

        // Adding to protect the route
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children :
        [
                { path: 'home1', component: Home1Component, },
                { path: 'Admin', component: AdminComponent},
        ]
    },
    { path: '**' , redirectTo: '', pathMatch: 'full'}
];
