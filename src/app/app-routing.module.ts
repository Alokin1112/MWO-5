import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCanActivateGuard } from '@core/guards/auth.guard';
import { CustomInterceptor } from '@core/interceptors/custom.interceptor';
import { AddBookComponent } from '@pages/addBook/addBook.component';
import { EditBookComponent } from '@pages/editBook/editBook.component';
import { HomeComponent } from '@pages/home/home.component';
import { LoginComponent } from '@pages/login/login.component';
import { RegisterComponent } from '@pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthCanActivateGuard],
  },
  {
    path: 'addBook',
    component: AddBookComponent,
    canActivate: [AuthCanActivateGuard],
  },
  {
    path: 'editBook/:id',
    component: EditBookComponent,
    canActivate: [AuthCanActivateGuard],
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
  exports: [RouterModule]
})
export class AppRoutingModule { }
