import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOnlyGuard } from './guards/admin.guard';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { HomeComponent } from './pages/home/home.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {
        path: 'users',
        component: ListUsersComponent,
        canActivate: [AdminOnlyGuard],
      },
      { path: 'products', component: ListProductsComponent },
      { path: 'productdetails/:id', component: ProductDetailsComponent },
      {
        path: 'addproduct',
        component: AddProductComponent,
        canActivate: [AdminOnlyGuard],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
