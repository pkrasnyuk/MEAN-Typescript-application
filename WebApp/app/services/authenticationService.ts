import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http"
import "rxjs/add/operator/map"

import { DtoUser, LoginUser } from "./../../app/dtoModels/dtoUserModel"

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(model: LoginUser) {
        return this.http.post("/api/authenticate", { email: model.email, password: model.password })
            .map((response: Response) => {
                const result = response.json();

                const dtoUser = new DtoUser(result.id, result.username, result.email, result.type);
                dtoUser.token = result.token;
                if (dtoUser.token) {
                    localStorage.setItem("currentUser", JSON.stringify(dtoUser));
                }

                return dtoUser;
            });
    }

    logout() {
        localStorage.removeItem("currentUser");
    }
}