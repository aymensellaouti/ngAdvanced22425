import { Component, OnDestroy } from "@angular/core";
import { Observable, Subscription, filter, map } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-test-observable",
  templateUrl: "./test-observable.component.html",
  styleUrls: ["./test-observable.component.css"],
})
export class TestObservableComponent implements OnDestroy {
  firstObservable$: Observable<number>;
  countDown = 5;
  subscription: Subscription = new Subscription();

  constructor(private toaster: ToastrService) {
    // 5 4 3 2 1
    this.firstObservable$ = new Observable((observer) => {
      let i = this.countDown;
      setInterval(() => {
        if (!i) {
          observer.complete();
        } else {
          observer.next(i--);
        }
      }, 1000);
    });
    this.subscription.add(
      this.firstObservable$.subscribe({
        next: (data) => {
          console.log(data);
        },
      })
    );
    // this.firstObservable$.subscribe({
    //   next: (data) => {
    //     this.countDown = data;
    //   },
    // });
    // setTimeout(() => {
    this.subscription.add(
      this.firstObservable$
        // 5 4 3 2 1
        .pipe(
          map((valeurTjini) => valeurTjini * 3),
          // 15 12 9 6 3
          filter((valeur) => valeur % 2 == 0)
          // 12 6
        )
        .subscribe({
          next: (data) => {
            toaster.info("" + data);
          },
          complete: () => {
            toaster.error("BOOOOOM!!!!!!!!");
          },
        })
    );
    // }, 3000);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
