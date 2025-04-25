import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { authGuard } from "../auth/guards/auth.guard";
import { AddCvComponent } from "./add-cv/add-cv.component";
import { CvComponent } from "./cv/cv.component";
import { DetailsCvComponent } from "./details-cv/details-cv.component";
import { MasterDetailsComponent } from "./master-details/master-details.component";
import { cvsResolver } from "./resolvers/cvs.resolver";

const routes: Route[] = [
  {
    path: "cv",
    component: CvComponent,
  },
  {
    path: "cv/list",
    component: MasterDetailsComponent,
    resolve: {
      cvs: cvsResolver,
    },
    children: [
      {
        path: ":id",
        component: DetailsCvComponent,
      },
    ],
  },
  { path: "cv/add", component: AddCvComponent, canActivate: [authGuard] },
  { path: "cv/:id", component: DetailsCvComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CvRoutingModule {}
