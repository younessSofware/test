import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends DataService {
  constructor(http: HttpClient) {
    super('/patients', http);
  }
  deletePatient(_id, user_id){
    return this.http.post(this.url + '/deletePatient', {_id: _id, user_id: user_id});
  }
  modifyPatient(patient){
    return this.http.post(this.url + '/modifyPatient', patient);
  }
  addPatient(patient, user_id){
    return this.http.post(this.url + '/addPatientToUser', {...patient, user_id: user_id});
  }
  getPatientsOfMalade(malade_id){
    return this.http.get(this.url +'/getPatientsOfMalade?_id=' + malade_id);
  }

  getAllPatients(_id){
    return this.http.get(this.url + '/getPatients?_id=' + _id);
  }
}
