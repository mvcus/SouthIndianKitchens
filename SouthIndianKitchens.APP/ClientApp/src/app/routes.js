"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_component_1 = require("./home/home.component");
var admin_component_1 = require("./admin/admin.component");
var lists_component_1 = require("./lists/lists.component");
var auth_guard_1 = require("./_gaurds/auth.guard");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var episode_component_1 = require("./episode/episode.component");
var recipe_component_1 = require("./recipe/recipe.component");
var reviews_compnent_1 = require("./reviews/reviews.compnent");
var aboutus_component_1 = require("./aboutus/aboutus.component");
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
            { path: 'episode', component: episode_component_1.EpisodeComponent },
            { path: 'recipe', component: recipe_component_1.RecipeComponent },
            { path: 'reviews', component: reviews_compnent_1.ReviewsComponent },
            { path: 'aboutus', component: aboutus_component_1.AboutusComponent }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
//# sourceMappingURL=routes.js.map