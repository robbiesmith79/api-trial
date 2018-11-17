import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesComponent } from './categories/categories.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { HomeComponent } from './home/home.component';
import { ProductsModule } from './products/products.module';
import { ProductsComponent } from './products/products.component';
import { ClarityModule } from '@clr/angular';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'products', component: ProductsComponent },
  //{ path: 'hero/:id',      component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/',
  //   pathMatch: 'full'
  // },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    ClarityModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ), 
    CategoriesModule,
    ProductsModule

  ],
  providers: [HttpModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
