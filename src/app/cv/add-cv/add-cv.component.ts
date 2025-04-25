import { Component, inject, OnDestroy } from "@angular/core";
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
import { CONSTANTES } from "../../../config/const.config";
import { uniqueCinValidator } from "../../validators/unique-cin.validator";

@Component({
  selector: "app-add-cv",
  templateUrl: "./add-cv.component.html",
  styleUrls: ["./add-cv.component.css"],
})
export class AddCvComponent implements OnDestroy {
  formBuilder = inject(FormBuilder);
  form: FormGroup = this.formBuilder.group(
    // Form description
    {
      name: ["", Validators.required],
      firstname: ["", Validators.required],
      path: ["", Validators.required],
      job: ["", Validators.required],
      cin: [
        "",
        {
          validators: [Validators.required, Validators.pattern("[0-9]{8}")],
          asyncValidators: [uniqueCinValidator(this.cvService)],
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
    // Options du formulaire : Validators + updateOn
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
  ) {
    this.age.valueChanges.subscribe({
      next: (age) => {
        if (age < 18) {
          this.path?.disable();
        } else {
          this.path?.enable();
        }
      },
    });
    const savedForm = localStorage.getItem(CONSTANTES.addCvToken);
    if (savedForm) {
      this.form.patchValue(JSON.parse(savedForm));
    }
  }
  ngOnDestroy(): void {
    if (this.form.valid) {
      localStorage.setItem(
        CONSTANTES.addCvToken,
        JSON.stringify(this.form.value)
      );
    }
  }

  addCv() {
    const cv = this.form.value;
    if (!cv.path) {
      cv.path = "";
    }

    this.cvService.addCv(this.form.value).subscribe({
      next: () => {
        this.toaster.success(`Le cv a été ajouté avec succès`);
        this.router.navigate([APP_ROUTES.cv]);
        localStorage.removeItem(CONSTANTES.addCvToken);
        this.form.reset();
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
