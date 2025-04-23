import { Component, inject } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  takeWhile,
  scan,
  distinctUntilChanged,
} from "rxjs";
import { Product } from "./dto/product.dto";
import { ProductService } from "./services/product.service";
import { Settings } from "./dto/product-settings.dto";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent {
  productService = inject(ProductService);
  private setting = {
    skip: 0,
    limit: 12,
  };
  private settings$ = new BehaviorSubject<Settings>(this.setting);
  // Todo : Faire le nécessaire pour créer le flux des produits à afficher */
  // Todo Tips : vous pouvez voir les différents imports non utilisés et vous en inspirer */
  products$: Observable<Product[]> = this.settings$.pipe(
    // {0 12}, {12 12}, {24 12} ....
    distinctUntilChanged(),
    concatMap((setting) => this.productService.getProducts(setting)),
    // apiResponse1, apiReponse2, ....
    map((productApiResponse) => productApiResponse.products),
    takeWhile((products) => !!products.length),
    scan((oldProducts, newProducts) => [...oldProducts, ...newProducts])
  );
  constructor() {}

  more() {
    this.setting = {
      limit: this.setting.limit,
      skip: this.setting.skip + this.setting.limit,
    };
    this.settings$.next(this.setting);
  }
}
