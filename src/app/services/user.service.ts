import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService{
  constructor(http: HttpClient) {
    super('/users', http);
  }
  getAlls(_id){
    return this.http.get(this.url + '/getAll?_id=' + _id);
  }
  getUser(_id){
    return this.http.get(this.url + '/getUser?_id=' + _id); 
  }
}
