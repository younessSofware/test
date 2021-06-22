import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfermerieService extends DataService {
  constructor(http: HttpClient) {
    super('/infermeris', http);
  }
  deleteInfermerie(_id, user_id){
    return this.http.post(this.url + '/deleteInfermerie', {_id: _id, user_id: user_id});
  }
  modifyInfermerie(infermerie){
    return this.http.post(this.url + '/modifyInfermerie', infermerie);
  }
  addInfermerie(infermerie, user_id){
    return this.http.post(this.url + '/addInfermerie', {...infermerie, user_id: user_id});
  }
}
