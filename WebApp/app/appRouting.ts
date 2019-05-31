import { Routes, RouterModule } from "@angular/router"

import { HomeComponent } from "./components/homeComponent"
import { LoginComponent } from "./components/loginComponent"
import { RegisterComponent } from "./components/registerComponent"
import { AuthGuard } from "./security/authGuard"

const appRoutes: Routes = [
    { path: "", component: HomeComponent, canActivate: [AuthGuard] },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },

    { path: "**", redirectTo: "" }
];

export const routing = RouterModule.forRoot(appRoutes);