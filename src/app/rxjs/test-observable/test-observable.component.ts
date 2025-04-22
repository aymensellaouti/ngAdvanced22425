import { Component, OnDestroy } from "@angular/core";
import { Observable, Subscription, filter, map } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-test-observable",
  templateUrl: "./test-observable.component.html",
  styleUrls: ["./test-observable.component.css"],
})
export class TestObservableComponent {
  firstObservable$: Observable<number>;

  constructor(private toaster: ToastrService) {
    // 5 4 3 2 1
    this.firstObservable$ = new Observable((observer) => {
      let i = 5;
      setInterval(() => {
        if (!i) {
          observer.complete();
        } else {
          observer.next(i--);
        }
      }, 1000);
    });
    this.firstObservable$.subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
}
