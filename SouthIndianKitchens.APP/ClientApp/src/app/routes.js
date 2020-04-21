"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_component_1 = require("./home/home.component");
var admin_component_1 = require("./admin/admin.component");
var lists_component_1 = require("./lists/lists.component");
var auth_guard_1 = require("./_gaurds/auth.guard");
exports.appRoutes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '', component: home_component_1.HomeComponent },
    {
        // Adding to protect the route
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [auth_guard_1.AuthGuard],
        children: [
            { path: 'admin', component: admin_component_1.AdminComponent },
            { path: 'lists', component: lists_component_1.ListsComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
//# sourceMappingURL=routes.js.map