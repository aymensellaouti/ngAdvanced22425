import { Injectable } from "@angular/core";
import { CredentialsDto } from "../dto/credentials.dto";
import { LoginResponseDto } from "../dto/login-response.dto";
import { HttpClient } from "@angular/common/http";
import { API } from "../../../config/api.config";
import { Observable, Subject } from "rxjs";

export interface ConnectedUser {
  id: string;
  email: string;
}
@Injectable({
  providedIn: "root",
})
export class AuthService {
  user$ = new Subject<ConnectedUser | null>();
  isLoggedIn$!: Observable<boolean>;
  isLoggedOut$!: Observable<boolean>;
  constructor(private http: HttpClient) {
    // Todo Récupérer le user du localstorage et faire le nécessaire
  }

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    // Todo Déplacer le stockage du token
    // Todo ajoute le user au flux
    // Todo ajouter le user dans le localStorage
    return this.http.post<LoginResponseDto>(API.login, credentials);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  logout() {
    // Todo enlever le user du localstorage
    // Todo mettre à jour le flux
    localStorage.removeItem("token");
  }
}
