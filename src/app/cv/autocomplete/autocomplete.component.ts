import { Component, inject } from "@angular/core";
import { FormBuilder, AbstractControl } from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  switchMap,
  tap,
} from "rxjs";
import { CvService } from "../services/cv.service";
import { Cv } from "../model/cv";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
})
export class AutocompleteComponent {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);
  get search(): AbstractControl {
    return this.form.get("search")!;
  }
  form = this.formBuilder.group({ search: [""] });
  cvs$: Observable<Cv[]> = this.search.valueChanges.pipe(
    // ma teb3ethli valeur kan ma io93ed le flux stable
    // 500 ms
    debounceTime(500),
    // ma teb3athlich el valuer kan ma tetbadelch
    distinctUntilChanged(),
    filter((search) => search && search.length >= 3),
    switchMap((searchField) => this.cvService.selectByName(searchField))
  );
  constructor() {}
}
