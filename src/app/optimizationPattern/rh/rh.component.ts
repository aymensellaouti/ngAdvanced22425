import { Component, inject, NgZone, OnInit } from "@angular/core";
import { User, UsersService } from "../users.service";
import * as ChartJs from "chart.js/auto";
@Component({
  selector: "app-rh",
  templateUrl: "./rh.component.html",
  styleUrls: ["./rh.component.css"],
})
export class RhComponent implements OnInit {
  oddUsers: User[];
  evenUsers: User[];
  chart: any;
  ngZone = inject(NgZone);
  constructor(private userService: UsersService) {
    this.oddUsers = this.userService.getOddOrEven(true);
    this.evenUsers = this.userService.getOddOrEven();
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.createChart();
    });
  }
  addUser(list: User[], newUser: string): User[] {
    return this.userService.addUser(list, newUser);
  }
  createChart() {
    const data = [
      { users: "Workers", count: this.oddUsers.length },
      { users: "Boss", count: this.evenUsers.length },
    ];
    this.chart = new ChartJs.Chart("MyChart", {
      type: "bar",
      data: {
        labels: data.map((row) => row.users),
        datasets: [
          {
            label: "Entreprise stats",
            data: data.map((row) => row.count),
          },
        ],
      },
    });
  }
}
