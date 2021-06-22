import { PatientService } from './../../../services/patient.service';
import { UserService } from './../../../services/user.service';
import { User } from './../../../../models/User';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.scss']
})
export class AnalyticComponent implements OnInit {
  user;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [2, 1, 2, 0],
      type: 'line'
    }],
    title: {
      style: {
        color: 'orange'
      },
      text: 'Chart Patient of malades'
    }
  };

  constructor(private userService: UserService, private patientService: PatientService) { }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
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

}
