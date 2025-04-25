import { NgModule } from "@angular/core";
import { TodoComponent } from "./todo/todo.component";
import { WeekTodoComponent } from "./week-todo/week-todo.component";
import { TodoRoutingModule } from "./todo-routing.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  // chneya les composants pipes et directives eli tab3ini
  declarations: [TodoComponent, WeekTodoComponent],
  // Njib les modules eli nest7a9hom ana welli tab3ini
  imports: [TodoRoutingModule, FormsModule, CommonModule],
  // les éléments eli tab3ini welli n7ab npartagihom m3a
  // les autres modules
  exports: [],
  // Les providers
  providers: [],
})
export class TodoModule {}
