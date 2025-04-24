import { Component, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CvService } from "../services/cv.service";
import { Cv } from "../model/cv";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-master-details",
  templateUrl: "./master-details.component.html",
  styleUrls: ["./master-details.component.css"],
})
export class MasterDetailsComponent {
  cvs: Cv[] = [];
  cvService = inject(CvService);
  toastr = inject(ToastrService);
  router = inject(Router);
  acr = inject(ActivatedRoute);
  constructor() {
    this.cvs = this.acr.snapshot.data["cvs"];
    this.cvService.selectCv$.pipe(takeUntilDestroyed()).subscribe({
      next: (cv) => {
        this.router.navigate([cv.id], {
          relativeTo: this.acr,
        });
      },
    });
  }
}
