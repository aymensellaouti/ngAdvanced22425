import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class Logger3Service {
  logger(something: any) {
    console.log("From Logger 2 Service :");
    console.log(something);
  }
}
