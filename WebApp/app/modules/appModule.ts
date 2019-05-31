import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { FormsModule } from "@angular/forms"
import { HttpModule } from "@angular/http"

import { AppComponent } from "./../components/appComponent"
import { routing } from "./../appRouting"

import { AlertComponent } from "./../components/alertComponent"
import { HomeComponent } from "./../components/homeComponent"
import { LoginComponent } from "./../components/loginComponent"
import { RegisterComponent } from "./../components/registerComponent"
import { AuthGuard } from "./../security/authGuard"
import { AlertService } from "./../services/alertService"
import { AuthenticationService } from "./../services/authenticationService"
import { UserService } from "./../services/userService"


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }