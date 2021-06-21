import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends DataService {

  constructor(http: HttpClient) {
    super('/messages', http);
  }

  getMessages(doctorId: string, patientId: string){
    this.url = "http://localhost:5000/api/messages/get?doctorId=" + doctorId + "&patientId=" + patientId;
    return this.http.get(this.url);
  }
  envoyer(doctorId: string, patientId: string, subject: string, files?: any[]){
    this.url = "http://localhost:5000/api/messages/envoyer";
    const formData = new FormData();
    files.forEach(file => {
      console.log(file)
      formData.append('files',file.blob, file.name);
    });
    formData.append('toId', patientId);
    formData.append('fromId', doctorId);
    formData.append('subject', subject);
    return this.http.post(this.url, formData);
  }
}
