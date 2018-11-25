import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UiModule } from './ui/ui.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { FormsModule } from '@angular/forms';
import { AddDocComponent } from "./ui/add-doc/add-doc.component";
import { DocListComponent } from "./ui/doc-list/doc-list.component";
import { AlertService } from "./ui/services/alert.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
