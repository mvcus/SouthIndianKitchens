"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_component_1 = require("./home/home.component");
var admin_component_1 = require("./admin/admin.component");
var lists_component_1 = require("./lists/lists.component");
var auth_guard_1 = require("./_gaurds/auth.guard");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
exports.appRoutes = [
    { path: '', component: home_component_1.HomeComponent },
    {
        // Adding to protect the route
        path: '',
        runGuardsAndResolvers: 'always',
        //canDeactivate: [AuthGuard]
        children: [
            { path: 'admin', component: admin_component_1.AdminComponent, canActivate: [auth_guard_1.AuthGuard], },
            { path: 'lists', component: lists_component_1.ListsComponent, canActivate: [auth_guard_1.AuthGuard], },
            { path: 'login', component: login_component_1.LoginComponent },
            { path: 'register', component: register_component_1.RegisterComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
//# sourceMappingURL=routes.js.map