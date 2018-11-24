import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DocListComponent } from './doc-list/doc-list.component';
import { AddDocComponent } from './add-doc/add-doc.component';
import { FileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent, 
    DocListComponent,
    AddDocComponent
  ],
  imports: [
    CommonModule,
    FileDropModule
  ],
  exports: [LayoutComponent]
})
export class UiModule { }
