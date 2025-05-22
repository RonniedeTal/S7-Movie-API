import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    {
  path: '',
    component:LoginComponent,
    },

    {
      path: 'home',
      component:HomeComponent,
      canActivate:[authGuard]
    },
    { 
      path: 'register',
      component: RegisterComponent
      },

    {
        path:"movie-detail/:id",
        component:MovieDetailComponent,
         canActivate:[authGuard]
    },

     { path: '**', redirectTo: '' },
     
];
