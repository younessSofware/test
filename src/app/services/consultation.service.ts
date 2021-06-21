import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService extends DataService {
  constructor(http: HttpClient) {
    super('/consultations', http);
  }

  addConsultation(rapport, prediction, etat, malade, patient){
    const formData = new FormData();
    formData.append('rapport', rapport.blob, rapport.filename)
    formData.append('prediction', prediction)
    formData.append('etat', etat)
    formData.append('malade', malade)
    formData.append('patient', patient)
    return this.http.post(this.url + '/addConsultation', formData);
  }
}
