import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { ProductsComponent } from './pages/products/products.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { DeliveryPaymentComponent } from './pages/delivery-payment/delivery-payment.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { DiscountAdminComponent } from './pages/admin/discount-admin/discount-admin.component';
import { CategoryAdminComponent } from './pages/admin/category-admin/category-admin.component';
import { ProductAdminComponent } from './pages/admin/product-admin/product-admin.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { AdminAuthGuard } from './shared/guards/admin-auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { OrderComponent } from './pages/admin/order/order.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'discounts', component: DiscountsComponent},
  {path: 'product-category/:product', component: ProductsComponent},
  {path: 'product-category/:product/:id', component: ProductInfoComponent},
  {path: 'discounts/:discounts/:id', component: DiscountInfoComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'delivery-payment', component: DeliveryPaymentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cabinet', component: CabinetComponent},
  {path: 'admin', canActivate:[AdminAuthGuard], component: AdminComponent},
  {path: 'admin/discount', canActivate:[AdminAuthGuard], component: DiscountAdminComponent},
  {path: 'admin/category', canActivate:[AdminAuthGuard], component: CategoryAdminComponent},
  {path: 'admin/product', canActivate:[AdminAuthGuard], component: ProductAdminComponent},
  {path: 'admin/order', canActivate:[AdminAuthGuard], component: OrderComponent},
  {path: 'order-history', component: OrderHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
