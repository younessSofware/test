import { PatientService } from './../../../services/patient.service';
import { MaladeService } from './../../../services/malade.service';
import { UserService } from './../../../services/user.service';
import { Malade } from './../../../../models/Malade';
import { User } from './../../../../models/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pharmacie',
  templateUrl: './pharmacie.component.html',
  styleUrls: ['./pharmacie.component.scss']
})
export class PharmacieComponent implements OnInit {
  user;
  dataLoading = false;
  malades = [];
  patients = [];
  medicaments = [];
  constructor(
    private userService: UserService,
    private patientService: PatientService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getMalades();
  }

  getMalades(){
    this.userService.getAlls(this.user._id).
    subscribe((resp: any) => {
      this.malades = resp.malades;
    });
  }

  selectMalade(malade){
    this.getPatients(malade.value)
  }
  selectMedicament(meds){
    this.medicaments.push(meds.value);
  }
  selectPatient(patient){

  }
  downloadRapport(){
  }
  submit(value?){

  }
  getPatients(_id){
    this.patientService.getPatientsOfMalade(_id)
    .subscribe((resp: any) => {
      this.patients = resp.patients
    });
  }
  getMedicament(_id){
    const index = this.malades.findIndex(malade => malade._id == _id);
    if(index >= 0 ){
      return this.malades[index].medicaments
    }else return [];
  }
}
