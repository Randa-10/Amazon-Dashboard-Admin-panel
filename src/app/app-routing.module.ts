import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SalesComponent } from './components/sales/sales.component';
import { ProductsComponent } from './components/products/products.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { UserAuthGuard } from './Guards/user-auth.guard';
import { OrdersComponent } from './components/orders/orders.component';



const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: '/home/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, title: 'dashboard page',canActivate:[UserAuthGuard] },
      { path: 'sales', component: SalesComponent, title: 'sales page',canActivate:[UserAuthGuard]  },
      { path: 'products', component: ProductsComponent, title: 'products page' },
      { path: 'users', component: UsersComponent, title: 'users page' },
      { path: 'orders', component: OrdersComponent, title: 'orders page' },
      {
        path: 'Users',
        loadChildren: () => import('./components/user-auth/user-auth.module').then(m => m.UserAuthModule)
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
