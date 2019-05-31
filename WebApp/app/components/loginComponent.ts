import { Component, OnInit } from "@angular/core"
import { Router, ActivatedRoute } from "@angular/router"
import { Response } from "@angular/http"

import { LoginUser } from "./../dtoModels/dtoUserModel"
import { AlertService } from "./../services/alertService"
import { AuthenticationService } from "./../services/authenticationService"

@Component({
    moduleId: module.id,
    templateUrl: "./loginComponent.html"
} as any)
export class LoginComponent implements OnInit {
    model = new LoginUser("", "");
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model)
            .subscribe(
                () => {
                    this.router.navigate([this.returnUrl]);
                },
                (responce: Response) => {
                    this.alertService.error(JSON.parse(responce.text()).message);
                    this.loading = false;
                });
    }
}