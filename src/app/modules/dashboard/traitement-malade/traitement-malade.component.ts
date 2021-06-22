import { ConsultationService } from './../../../services/consultation.service';
import { MessageService } from './../../../services/message.service';
import { PredParam } from './../../../../models/PredParam';
import { PredictionsService } from './../../../../services/predictions.service';
import { User } from './../../../../models/User';
import { Patient } from './../../../../models/Patient';
import { PatientService } from './../../../services/patient.service';
import { ActivatedRoute, Routes, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-traitement-malade',
  templateUrl: './traitement-malade.component.html',
  styleUrls: ['./traitement-malade.component.scss']
})
export class TraitementMaladeComponent implements OnInit {
  nomOfMalade: any;
  patients = [];
  user;
  checkeds = [];
  list_images_selected = [];
  prediction: any;
  loading = false;
  patientSelected: Patient;
  etatMaladeSelection;
  download = false;
  rapportDownload;
  malade_id: string;
  constructor(private route: ActivatedRoute,
    private patientService: PatientService,
    private predService: PredictionsService,
    private msgService: MessageService,
    private router: Router,
    private consultationService: ConsultationService
    ) { }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.route.queryParamMap.subscribe((param) => {
      this.malade_id = param.get('malade_id');
      this.getPatientsOfMalade();
    });
  }
  getPatientsOfMalade(){
    this.patientService.getPatientsOfMalade(this.malade_id)
    .subscribe((resp: any) => {
      this.patients = resp.patients;
      this.nomOfMalade = resp.nomOfMalade
    })
  }


  checkToggle(patientSelected: Patient, checkedTarget){
    // this.checked = true;
    if (!this.checkeds.includes(patientSelected)){
      this.checkeds.push(patientSelected);
    }
    else{
      this.checkeds.splice(this.checkeds.indexOf(patientSelected), 1);
    }
    // if (!this.checkeds.length){
    //   this.checked = false;
    // }
  }

  imageSelected(fileSelected){
    const images = fileSelected.files;
    for(let i=0; i<images.length; i++){
      this.Main(images[i])
    }
  }
  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.rapportDownload = reader.result;
      resolve(reader.result);
    }
    reader.onerror = error => reject(error);
  });
  async  Main(file) {
    this.list_images_selected.push(await this.toBase64(file));
 }

 lancerPrediction(){
  this.list_images_selected.map((target, index) => {
    const imgTag = document.createElement('img');
    imgTag.src = target;
    this.predService.predict(new PredParam(imgTag), this.nomOfMalade.toLowerCase()).then((pred: any) => {
      this.prediction = pred;
      this.prediction.nom = this.checkeds[0].nom;
      this.prediction.prenom = this.checkeds[0].prenom;
      this.loading = true;
    }, err => {
        this.loading = true;
    });
  })
 }
 downloadRapport(){
   this.download = true;
 }
 creerOrdonnance(){

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
 envoyerRapport(){
   const files = []
   const blob = this.dataURItoBlob(this.rapportDownload);
   files.push({ blob: blob, filename: 'rapport.pdf'});
    this.msgService.envoyer(this.user._id, this.checkeds[0]._id, undefined, files)
    .subscribe((resp) => { 
       this.consultationService.addConsultation(
         files[0], this.prediction.porcentage, this.prediction.etat, this.malade_id, this.checkeds[0]._id)
         .subscribe((resp) => {
          this.router.navigateByUrl('/messages?patientSelected_id=' + this.checkeds[0]._id);
         });
    })
  }
}
