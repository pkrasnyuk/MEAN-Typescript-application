import { Injectable } from "@angular/core"
import { Http } from "@angular/http"

import { DtoUser, RegisterUser } from "./../dtoModels/dtoUserModel"
import AppConfig from "./../config/appConfig"
import { AuthEx } from "./../modules/commonModule"

@Injectable()
export class UserService {

    private url = AppConfig.apiUrl + "/users";

    constructor(private http: Http) {
    }

    getUsers() {
        return this.http.get(this.url);
    }

    registerUser(obj: RegisterUser) {
        const body = JSON.stringify(obj);
        return this.http.post(this.url, body, AuthEx.createAuthenticationHeader(true));
    }

    createUser(obj: DtoUser) {
        const body = JSON.stringify(obj);
        return this.http.post(this.url, body, AuthEx.createAuthenticationHeader(true));
    }

    updateUser(id: Number, obj: DtoUser) {
        const body = JSON.stringify(obj);
        return this.http.put(this.url + "/" + id, body, AuthEx.createAuthenticationHeader(true));
    }

    deleteUser(id: Number) {
        return this.http.delete(this.url + "/" + id, AuthEx.createAuthenticationHeader(false));
    }
}