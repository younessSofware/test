import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { TraitementMaladeComponent } from './modules/dashboard/traitement-malade/traitement-malade.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : '',
    component : LoginComponent,
    canActivate : [GuestGuard]
  },
  {
    path : 'login',
    component : LoginComponent,
    canActivate : [GuestGuard]
  },
  {
    path : 'dash',
    component : DashboardComponent,
    canActivate : [AuthGuard]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
