import { PatientService } from './../../../services/patient.service';
import { Patient } from './../../../../models/Patient';
import { Malade } from './../../../../models/Malade';
import { UserService } from './../../../services/user.service';
import { User } from './../../../../models/User';
import { Component, OnInit } from '@angular/core';
import { Date } from 'core-js';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {
  user;
  malades: Malade[];
  mesPatients = [];
  download = false;
  src;
  constructor(private userService: UserService, private patientService: PatientService) { 
  }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.src = this.user.photos[0].data;
    console.log(this.src.length)
    this.getAll();
  }
  getAll(){
    const user_id = JSON.parse(localStorage.getItem('user'))._id;
    this.userService.getAlls(user_id)
    .subscribe((res: any) => {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.user.consultations = res.consultations;
      this.user.patients = res.patients;
      this.user.malades = res.malades;
      this.nbPatient();      
      this.getEtatAndDate();
    })
  }

  getEtatAndDate(){
    this.user.patients.map((patient) => {
      patient.malades.map((malade_id) => {
        this.user.consultations.map((consult) => {
          if(consult.malade == malade_id ) {
            let nomMalade = this.user.malades[this.user.malades.findIndex( malade => malade._id.toString() == malade_id.toString())]
            this.mesPatients.push({
              patient: patient,
              etat: consult.etat,
              malade: nomMalade, 
              date: consult.updatedAt,
              consult: consult
            });
          } 
        })
      });
    })
  }

  nbPatient(){
    
    this.user.malades.map((malade, index) => {
      this.patientService.getPatientsOfMalade(malade._id)
      .subscribe((resp: any) => {
        this.user.malades[index].nbPatient = resp.patients.length;
      });
    })
  }
  downloadRapport(){
    this.download = true;
  }
}
