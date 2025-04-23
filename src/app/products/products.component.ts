import { Component, inject } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  takeWhile,
  scan,
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
  private settings$ = new BehaviorSubject<Settings>({
    skip: 0,
    limit: 12,
  });
  // Todo : Faire le nécessaire pour créer le flux des produits à afficher */
  // Todo Tips : vous pouvez voir les différents imports non utilisés et vous en inspirer */
  products$: Observable<Product[]> = this.settings$.pipe(
    // {0 12}, {12 12}, {24 12} ....
    concatMap((setting) => this.productService.getProducts(setting))
    // apiResponse1, apiReponse2, ....
  );
  constructor() {}

  more() {}
}
