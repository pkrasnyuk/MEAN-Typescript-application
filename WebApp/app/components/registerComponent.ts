import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { Response } from "@angular/http"

import { AlertService } from "./../services/alertService"
import { UserService } from "./../services/userService"
import { EnumEx } from "./../modules/commonModule"
import { UserType } from "./../dtoModels/dtoUserModel"

import { RegisterUser } from "./../../app/dtoModels/dtoUserModel"

@Component({
    moduleId: module.id,
    templateUrl: "./registerComponent.html"
} as any)
export class RegisterComponent {
    model: any = {};
    loading = false;
    userTypeList: Array<any>;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
        this.userTypeList = EnumEx.getNamesAndValues(UserType);
    }

    register() {
        this.loading = true;
        const user = new RegisterUser(this.model.username, this.model.email, this.model.type, this.model.password);
        this.userService.registerUser(user)
            .subscribe(
                () => {
                    this.alertService.success("Registration successful", true);
                    this.router.navigate(["/login"]);
                },
                (responce: Response) => {
                    this.alertService.error(JSON.parse(responce.text()).message);
                    this.loading = false;
                });
    }
}