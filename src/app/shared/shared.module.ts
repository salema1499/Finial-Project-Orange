import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { LoadingComponent } from '../components/loading/loading.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { UserCardComponent } from '../components/user-card/user-card.component';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    ProductCardComponent,
    UserCardComponent,
    LoadingComponent,
  ],
  imports: [AppRoutingModule, CommonModule],
  exports: [
    SidebarComponent,
    NavbarComponent,
    ProductCardComponent,
    UserCardComponent,
    LoadingComponent,
  ],
})
export default class SharedModule {}
