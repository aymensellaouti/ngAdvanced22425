import { Component, OnInit } from "@angular/core";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { APP_ROUTES } from "../../../config/routes.config";
import { AuthService } from "../../auth/services/auth.service";
import { catchError, EMPTY, mergeMap, Observable, switchMap } from "rxjs";

@Component({
  selector: "app-details-cv",
  templateUrl: "./details-cv.component.html",
  styleUrls: ["./details-cv.component.css"],
})
export class DetailsCvComponent {
  //cv: Cv | null = null;
  cv$: Observable<Cv> = this.activatedRoute.params.pipe(
    switchMap((params) => this.cvService.getCvById(+params["id"])),
    catchError((e) => {
      this.router.navigate([APP_ROUTES.cv]);
      return EMPTY;
    })
  );
  constructor(
    private cvService: CvService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    public authService: AuthService
  ) {
    // this.activatedRoute.params.subscribe({
    //   next: (params) => {
    //     const id = this.activatedRoute.snapshot.params["id"];
    //     this.cvService.getCvById(+id).subscribe({
    //       next: (cv) => {
    //         this.cv = cv;
    //       },
    //       error: (e) => {
    //         this.router.navigate([APP_ROUTES.cv]);
    //       },
    //     });
    //   },
    // });
  }
  deleteCv(cv: Cv) {
    this.cvService.deleteCvById(cv.id).subscribe({
      next: () => {
        this.toastr.success(`${cv.name} supprimé avec succès`);
        this.router.navigate([APP_ROUTES.cv]);
      },
      error: () => {
        this.toastr.error(
          `Problème avec le serveur veuillez contacter l'admin`
        );
      },
    });
  }
}
