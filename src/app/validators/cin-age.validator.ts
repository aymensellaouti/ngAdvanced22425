import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function cinAgeValidator(
  form: AbstractControl
): null | ValidationErrors {
  const age = +form?.get("age")?.value;
  const cin = +form?.get("cin")?.value.substring(0, 2);

  if (!age || !cin) return null;
  return (age >= 60 && cin >= 20) || (age < 60 && cin < 20)
    ? { cinAge: "L'age et le cin ne concorde pas" }
    : null;
}
