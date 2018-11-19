import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ClarityModule } from "@clr/angular";
import { CategoriesComponent } from "./categories.component";

@NgModule({
  imports: [
    CommonModule,
    ClarityModule
  ],
  declarations: [
    CategoriesComponent
  ]
})

export class CategoriesModule { }