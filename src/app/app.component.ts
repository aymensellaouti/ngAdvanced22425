import { Component, Inject } from "@angular/core";
import { LoggerService } from "./services/logger.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Starting Advanced Topics";
  constructor(@Inject(LoggerService) private loggerServices: LoggerService[]) {
    this.loggerServices.forEach((loggerService) =>
      loggerService.logger("cc je suis le appComponent")
    );
  }
}
