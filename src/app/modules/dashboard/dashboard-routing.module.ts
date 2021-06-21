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
  },
  {
    path : 'messages',
    component : MessagesComponent,
  },
  {
    path : 'traitementMalade',
    component : TraitementMaladeComponent,
  },
  {
    path : 'pharmacie',
    component : PharmacieComponent,
  },
  {
    path : 'team',
    component : TeamComponent,
  },
  {
    path : 'patients',
    component : PaientsComponent,
  },
  {
    path : 'biblio',
    component : BiblioComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
