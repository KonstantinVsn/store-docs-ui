import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth/auth.component";
import { LayoutComponent } from "./ui/layout/layout.component";
import { NodesComponent } from "./nodes/nodes.component";

const routes: Routes = [
  {
    path: "auth",
    component: AuthComponent,
  },
  {
    path:"docs",
    component: LayoutComponent
  },
  {
    path:"nodes",
    component: NodesComponent
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
