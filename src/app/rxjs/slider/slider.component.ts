import { HttpClient } from "@angular/common/http";
import { Component, inject, Input } from "@angular/core";
import { Observable, combineLatest, map, startWith, timer } from "rxjs";
import { API } from "../../../config/api.config";
import { ImagesApiDto } from "../../dtos/images-api.dto";

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.css"],
})
export class SliderComponent {
  @Input() timer = 1500;
  @Input() size = 150;
  @Input() imagePaths = [
    "as.jpg",
    "cv.png",
    "rotating_card_profile.png",
    "rotating_card_profile2.png",
    "rotating_card_profile3.png",
  ];
  http = inject(HttpClient);
  images$ = this.http.get<ImagesApiDto[]>(API.photos);
  /* Todo : Créer le flux permettant de générer les images à afficher dans le slider */
  paths$: Observable<string> = combineLatest([
    timer(0, this.timer),
    this.images$,
  ]).pipe(
    map(([index, images]) => images[index % images.length].thumbnailUrl),
    startWith(
      "https://logowik.com/content/uploads/images/angular-a-letter-new-20243216.logowik.com.webp"
    )
  );
  //.pipe(map(() => ))
  // [O, ImagesApiDto[]],  [1, ImagesApiDto[]]
  // 0 1 2 3 4 5 6
  //map((index) => this.imagePaths[index % this.imagePaths.length])
  // img1 img2 ....
}
