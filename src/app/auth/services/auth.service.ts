import { Injectable } from "@angular/core";
import { CredentialsDto } from "../dto/credentials.dto";
import { LoginResponseDto } from "../dto/login-response.dto";
import { HttpClient } from "@angular/common/http";
import { API } from "../../../config/api.config";
import { BehaviorSubject, map, Observable, Subject, tap } from "rxjs";

export interface ConnectedUser {
  id: number;
  email: string;
}
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userSubject$ = new BehaviorSubject<ConnectedUser | null>(null);
  user$ = this.userSubject$.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map((user) => !!user));
  isLoggedOut$: Observable<boolean> = this.user$.pipe(map((user) => !user));
  constructor(private http: HttpClient) {
    // Todo Récupérer le user du localstorage et faire le nécessaire
    const user = localStorage.getItem("user");
    if (user) {
      this.userSubject$.next(JSON.parse(user));
    }
  }

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) => {
        // Todo Déplacer le stockage du token : OK
        localStorage.setItem("token", response.id);
        // Todo ajoute le user au flux
        const user: ConnectedUser = {
          id: response.userId,
          email: credentials.email,
        };
        this.userSubject$.next(user);
        // Todo ajouter le user dans le localStorage
        localStorage.setItem("user", JSON.stringify(user));
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  logout() {
    // Todo enlever le user du localstorage
    localStorage.removeItem("user");
    // Todo mettre à jour le flux
    this.userSubject$.next(null);
    localStorage.removeItem("token");
  }
}
