import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ClarityModule } from "@clr/angular";
import { ProductsComponent } from "./products.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

@NgModule({
  imports: [
    CommonModule,
    ClarityModule
  ],
  declarations: [
    ProductsComponent
  ]
})

export class ProductsModule { }