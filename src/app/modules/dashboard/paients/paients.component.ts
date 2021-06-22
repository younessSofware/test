import { PatientService } from './../../../services/patient.service';
import { UserService } from './../../../services/user.service';
import { Patient } from './../../../../models/Patient';
import { User } from './../../../../models/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paients',
  templateUrl: './paients.component.html',
  styleUrls: ['./paients.component.scss']
})
export class PaientsComponent implements OnInit {
  user;
  addPatient = false;

  patients: Patient[] = [];
  patientEdit: Patient;
  patientDeleted: Patient;
  constructor(private userService: UserService, private patientService: PatientService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getPatients();
  }

  getPatients(){
    this.userService.getAlls(this.user._id)
    .subscribe((resp: any) => {
      this.patients = resp.patients;

    });
  }
  save(patient){
    console.log(patient)
    if(patient._id){
      this.patientService.modifyPatient(patient).
      subscribe((resp) => {
        console.log(resp)
        const index = this.patients.findIndex(pat => pat._id == patient._id);
        this.patients[index] = patient;
      })
    }else{
      this.patientService.addPatient(patient, this.user._id).
      subscribe((resp) => {
        console.log(resp)
        this.patients.push(patient)
      })

    }
  }
  deleteP(){
    this.patientService.deletePatient(this.patientDeleted._id, this.user._id)
    .subscribe((resp) => {
      const index = this.patients.findIndex(patient => patient == this.patientDeleted );
      this.patients.splice(index, 1);
    })
  }

}
