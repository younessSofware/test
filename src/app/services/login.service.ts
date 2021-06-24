import { User } from './../../models/User';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  options = {
    uri: 'https://eastus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_04&returnRecognitionModel=false&detectionModel=detection_03&faceIdTimeToLive=86400',
    verifyUri: 'https://eastus.api.cognitive.microsoft.com/face/v1.0/verify',
    headers : {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': '31024abd20e841c1b747ed349eebf23c'
    }
  };
  constructor(private http: HttpClient) { }
  url = 'http://localhost:5000/api/users/';
  upload(blob) {
    return this.http.post(this.options.uri, blob, {
      headers: this.options.headers     
    });
  }

  signin(email, password){
    return this.http.post(this.url + 'signin', {email,password});
  }



  signup(user: User){
    const userFormData = new FormData();
    const keys = Object.keys(user);
    keys.map((key) => {
      if(key == 'photos'){
        user[key].map((photo) => {
          userFormData.append('files', photo, photo.name)
        })
      }else{
        userFormData.append(key, user[key]);
      }
    });
    return this.http.post(this.url + 'signup', userFormData);
  }
  
  detectFaceByCamera(blob){
    return this.http.post(this.options.uri, blob,{
      headers: this.options.headers     
    });
  }
  
  signinByCamera(faceIds){
    return this.http.post(this.url + 'signinByCamera', {faceIds: faceIds});
  }
  

  getToken(){
    return localStorage.getItem('token');
  }
}
