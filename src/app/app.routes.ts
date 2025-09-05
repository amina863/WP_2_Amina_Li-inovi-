import { Routes } from '@angular/router';
import { provideRouter, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewsDetailsComponent } from './pages/news-details/news-details.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'news/:id', component: NewsDetailsComponent },
  { path: 'categories/:id', component: CategoriesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },

];

export const appRoutingProviders = [provideRouter(appRoutes)];
