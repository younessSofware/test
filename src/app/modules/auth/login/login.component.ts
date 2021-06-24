import { User } from './../../../../models/User';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorTakeImage: any;
  loadingSignIn = true;
  init(){
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".ma-container");
    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    })
    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  }
  startSignup = false;
  user: User;
  usingCamera = false;
  photos = [];
  valueOfButton = 'Add your face image';
  err = '';
  loading = true;
  loadingCamera: Boolean;
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  constructor( private loginService: LoginService, private router: Router){
  }
  ngOnInit(){
    this.init();
  }

  login(email, password){
    this.loadingSignIn = false;
    this.loginService.signin(email, password)
    .subscribe((res: any) => {
      this.loadingSignIn = true;
      localStorage.setItem('token', res.token);
      res.user.photos[0].data = 'data:image/png;base64,' + this.arrayBufferToBase64(res.user.photos[0].data);
      localStorage.setItem('user', JSON.stringify(res.user));
      this.router.navigateByUrl('/dash');
    })
  }
  arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }
  success;
  register(nom, prenom, email, password,specialisation,nomClinique ,adresseClinique){
    this.loading = false;
    this.user = new User(nom, prenom, email, password, specialisation,nomClinique ,adresseClinique);
    this.photos.map((photo) => {
      this.user.photos.push(photo);
    })
    let faceids = [];
    this.err = '';
    let reader = new FileReader();
    let blob;
    const file = this.user.photos[0];
    file.arrayBuffer().then(arrayBuffer => {
      let blob = new Blob([new Uint8Array(arrayBuffer)], {type: file.type });
      this.loginService.upload(blob).subscribe((res :any) => {
        if(res.length){
          faceids = res;
          this.user.faceIds = faceids;
          this.loginService.signup(this.user)
          .subscribe((res: any) => {
            this.loading = true;
            console.log(res);
            document.getElementById('sign-in-btn').click();
          }, err => {
            this.loading = true;
          });
        }else{
          this.err =  "You cannot detect a face in your images";
          this.loading = true;
        }
      })
    })
  }
 
  handleImage(event){
    this.test(event._imageAsDataUrl);
  }
  selectFiles(target){
    this.photos = [];
    const files = target.files;
    for(let i=0; i<files.length; i++){
      if(files[i].type != "image/jpeg" && files[i].type !== "image/png" && files[i].type !== "image/jpg"){
        alert("just images");
        return;
      }else{
        this.photos.push(files[i]);
      }
    }
  }
  public triggerSnapshot(webcam): void {
    this.trigger.next();
    webcam.video.nativeElement.pause();
    webcam.mediaStream.getTracks().forEach(track => track.stop())
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
  errCamera = false
  test(data64){
    this.loadingCamera = true;
    const blob = this.dataURItoBlob(data64);
    this.loginService.detectFaceByCamera(blob)
    .subscribe((res: any) => {
      if(res.lenght == 0){
        this.errorTakeImage = "error, repeat";
      }else{
        this.loginService.signinByCamera(res[0].faceId)
        .subscribe((data: any) => {
          this.loadingCamera = false;
          if(data.token){
            this.success = true
            localStorage.setItem('token', data.token);
            data.user.photos[0].data = 'data:image/png;base64,' + this.arrayBufferToBase64(data.user.photos[0].data);
            localStorage.setItem('user', JSON.stringify(data.user));
            this.router.navigateByUrl('/dash');
          }
        }, err => {
          this.success = false
          this.loadingCamera = false;
        })
      }
    }, err => {
    })
  }

  getDataUrl(img) {
    // Create canvas
    const canvas = document.createElement("canvas");;
    const ctx = canvas.getContext('2d');
    // Set width and height
    canvas.width = img.width;
    canvas.height = img.height;
    // Draw the image
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/jpeg');
 }

  dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);  
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  }
}
