import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from "./auth.service";



const routes: Routes = [
    { path: "", redirectTo: '/home', pathMatch : 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent,canActivate: [AuthService]},
    {path: 'login', component: LoginComponent},
    {path: 'verify/:id', component: VerifyComponent},
    {path: 'register', component: RegisterComponent},
    {path: '404', component: NotFoundComponent},
    {path: '**', redirectTo: '/404'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'ignore',
    scrollPositionRestoration: 'enabled'
  })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
