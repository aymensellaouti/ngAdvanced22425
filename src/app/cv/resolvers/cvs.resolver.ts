import { ResolveFn } from "@angular/router";
import { CvService } from "./../services/cv.service";
import { inject } from "@angular/core";
import { Cv } from "../model/cv";
import { catchError, of } from "rxjs";
import { ToastrService } from "ngx-toastr";

export const cvsResolver: ResolveFn<Cv[]> = (route, state) => {
  const cvService = inject(CvService);
  const toastr = inject(ToastrService);
  return cvService.getCvs().pipe(
    catchError((e) => {
      toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
      return of(cvService.getFakeCvs());
    })
  );
};
