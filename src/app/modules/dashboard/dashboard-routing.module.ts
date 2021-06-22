import { AuthGuard } from './../../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { AnalyticComponent } from './analytic/analytic.component';
import { BiblioComponent } from './biblio/biblio.component';
import { PaientsComponent } from './paients/paients.component';
import { TeamComponent } from './team/team.component';
import { PharmacieComponent } from './pharmacie/pharmacie.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard.component';
import { TraitementMaladeComponent } from './traitement-malade/traitement-malade.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : '',
    component : DashboardComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'messages',
    component : MessagesComponent,
    canActivate : [AuthGuard]

  },
  {
    path : 'traitementMalade',
    component : TraitementMaladeComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'pharmacie',
    component : PharmacieComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'team',
    component : TeamComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'patients',
    component : PaientsComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'biblio',
    component : BiblioComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'analytic',
    component : AnalyticComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate : [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
