import { TemplateRef, ViewChild } from "@angular/core"
import { Component, OnInit } from "@angular/core"
import { Response } from "@angular/http"
import "rxjs/Rx";

import { DtoUser, UserType } from "./../dtoModels/dtoUserModel"
import { AlertService } from "./../services/alertService"
import { UserService } from "./../services/userService"
import { EnumEx } from "./../modules/commonModule"

@Component(({
    moduleId: module.id,
    templateUrl: "./homeComponent.html",
    providers: [UserService]
}) as any)
export class HomeComponent implements OnInit {

    @ViewChild("readOnlyTemplate") readOnlyTemplate: TemplateRef<any>;
    @ViewChild("editTemplate") editTemplate: TemplateRef<any>;

    currentUser: DtoUser;

    editedUser: DtoUser;
    users: Array<DtoUser>;
    isNewRecord: boolean;
    statusMessage: string;
    userTypeList: Array<any>;

    constructor(
        private serv: UserService,
        private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.users = new Array<DtoUser>();
        this.userTypeList = EnumEx.getNamesAndValues(UserType);
    }

    ngOnInit() {
        this.loadUsers();
    }

    private loadUsers() {
        this.serv.getUsers().subscribe((resp: Response) => {
            this.users = resp.json();
        });
    }

    addUser() {
        this.editedUser = new DtoUser(0, "", "", UserType.Developer);
        this.users.push(this.editedUser);
        this.isNewRecord = true;
    }

    editUser(user: DtoUser) {
        this.editedUser = new DtoUser(user.id, user.username, user.email, user.type);
    }

    loadTemplate(user: DtoUser) {
        if (this.editedUser && this.editedUser.id == user.id) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
    }

    saveUser() {
        if (this.isNewRecord) {
            this.serv.createUser(this.editedUser).subscribe(
                () => {
                    this.alertService.success("An user successfully added");
                },
                (responce: Response) => {
                    this.alertService.error(JSON.parse(responce.text()).message);
                },
                () => {
                    this.loadUsers();
                });
            this.isNewRecord = false;
        } else {
            this.serv.updateUser(this.editedUser.id, this.editedUser).subscribe(
                () => {
                    this.alertService.success("The user successfully updated");
                },
                (responce: Response) => {
                    this.alertService.error(JSON.parse(responce.text()).message);
                },
                () => {
                    this.loadUsers();
                });
        }
        this.editedUser = null;
    }

    deleteUser(user: DtoUser) {
        this.serv.deleteUser(user.id).subscribe(
            () => {
                this.alertService.success("The user successfully deleted");
                this.loadUsers();
            },
            (responce: Response) => {
                this.alertService.error(JSON.parse(responce.text()).message);
            });
    }

    cancel() {
        this.editedUser = null;
    }
}