import { Component, inject } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { CvService } from "../services/cv.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { APP_ROUTES } from "src/config/routes.config";
import { Cv } from "../model/cv";

@Component({
  selector: "app-add-cv",
  templateUrl: "./add-cv.component.html",
  styleUrls: ["./add-cv.component.css"],
})
export class AddCvComponent {
  formBuilder = inject(FormBuilder);
  form: FormGroup = this.formBuilder.group(
    {
      name: ["", Validators.required],
      firstname: ["", Validators.required],
      path: ["", Validators.required],
      job: ["", Validators.required],
      cin: [
        "",
        {
          validators: [Validators.required, Validators.pattern("[0-9]{8}")],
          asyncValidators: [],
        },
      ],
      age: [
        0,
        {
          validators: [
            Validators.required,
            Validators.pattern("[0-1]?[0-9]{1,2}"),
          ],
          updateOn: "blur",
        },
      ],
    },
    {
      validators: [],
      asyncValidators: [],
      updateOn: "change",
    }
  );
  constructor(
    private cvService: CvService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  addCv() {
    this.cvService.addCv(this.form.value).subscribe({
      next: () => {
        this.toaster.success(`Le cv a été ajouté avec succès`);
        this.router.navigate([APP_ROUTES.cv]);
      },
      error: (erreur) => {
        console.log(erreur);
        this.toaster.error(
          `Problème avec le serveur veuillez contacter l'admin`
        );
      },
    });
  }

  get name(): AbstractControl {
    return this.form.get("name")!;
  }
  get firstname() {
    return this.form.get("firstname");
  }
  get age(): AbstractControl {
    return this.form.get("age")!;
  }
  get job() {
    return this.form.get("job");
  }
  get path() {
    return this.form.get("path");
  }
  get cin(): AbstractControl {
    return this.form.get("cin")!;
  }
}
