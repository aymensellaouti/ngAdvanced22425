import { ResolveFn } from "@angular/router";
import { CvService } from "./../services/cv.service";
import { inject } from "@angular/core";
import { Cv } from "../model/cv";

export const cvsResolver: ResolveFn<Cv[]> = (route, state) => {
  const cvService = inject(CvService);
  return cvService.getCvs();
};
