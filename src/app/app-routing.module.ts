import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { UserAuthGuard } from './Guards/user-auth.guard';
import { OrdersComponent } from './components/orders/orders.component';



const routes: Routes = [
  {
    path: 'Users',
    loadChildren: () => import('./components/user-auth/user-auth.module').then(m => m.UserAuthModule)
  },
  { path: '', redirectTo: 'Users/login', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, title: 'dashboard page',canActivate: [UserAuthGuard]  },
      { path: 'products', component: ProductsComponent, title: 'products page',canActivate: [UserAuthGuard]  },
      { path: 'updateProduct/:prodID', component: ProductsComponent, title: 'products page',canActivate: [UserAuthGuard]  },
      { path: 'users', component: UsersComponent, title: 'users page',canActivate: [UserAuthGuard]  },
      { path: 'orders', component: OrdersComponent, title: 'orders page' ,canActivate: [UserAuthGuard]} 
      // ,{
      //   path: 'Users',
      //   loadChildren: () => import('./components/user-auth/user-auth.module').then(m => m.UserAuthModule)
      // },
      ,{ path: '**', redirectTo: 'Users/login', pathMatch: 'full' } 
    ]
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}