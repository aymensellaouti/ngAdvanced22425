import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { User } from "../users.service";

@Component({
  selector: "app-user-list-details",
  templateUrl: "./user-list-details.component.html",
  styleUrls: ["./user-list-details.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListDetailsComponent {
  @Input() users: User[] = [];
}
