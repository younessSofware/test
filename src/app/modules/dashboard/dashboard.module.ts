import { RouterModule } from '@angular/router';
import { PdfComponent } from './traitement-malade/pdf/pdf.component';
import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { TraitementMaladeComponent } from './traitement-malade/traitement-malade.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MessagesComponent } from './messages/messages.component';
import { PaientsComponent } from './paients/paients.component';
import { TeamComponent } from './team/team.component';
import { PharmacieComponent } from './pharmacie/pharmacie.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BiblioComponent } from './biblio/biblio.component';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeContentComponent,
    TraitementMaladeComponent,
    PdfComponent,
    MessagesComponent,
    PaientsComponent,
    TeamComponent,
    PharmacieComponent,
    SidebarComponent,
    BiblioComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    DashboardRoutingModule,
    RouterModule
  ]
})
export class DashboardModule { }
