import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ClarityModule } from "@clr/angular";
import { ProductsComponent } from "./products.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule
  ],
  declarations: [
    ProductsComponent
  ]
})

export class ProductsModule { }