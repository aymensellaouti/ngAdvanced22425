import { CanDeactivateFn } from "@angular/router";
import { TodoComponent } from "../todo/todo/todo.component";
import { CanLeave } from "./can-leave.interface";

export const canLeaveGuard: CanDeactivateFn<CanLeave> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  if (!component.canLeave()) {
    return confirm("vous etes sur de vouloir quitter la page ?");
  }
  return true;
};
