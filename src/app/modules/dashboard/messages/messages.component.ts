import { MessageService } from './../../../services/message.service';
import { UserService } from './../../../services/user.service';
import { PatientService } from './../../../services/patient.service';
import { Patient } from './../../../../models/Patient';
import { Message } from './../../../../models/Message';
import { User } from './../../../../models/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  user: User;
  messages: Message[] = [];
  filesSelected = [];
  patientSelected: Patient;
  constructor(private userService: UserService, private msgService: MessageService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getPatients();
  }

  fiileSelected(target){
    for(let i=0; i<target.files.length; i++) this.filesSelected.push(target.files[i]);
  }
  scrollToBottom(){
    const element = document.getElementById("chat");
    element.scrollTop = 900*900*900*900;
    // element.scrollTo({
    //   top: element.scrollHeight,
    //   left: 0,
    //   behavior: 'smooth'
    // });
  }
  envoyer(tagMessage){
    const new_message = new Message();
    new_message.fromDoctorId = this.user._id;
    new_message.toPatientId = this.patientSelected._id;
    new_message.updatedAt = new Date();
    if(this.filesSelected.length){
      new_message.files = new_message.files.concat(this.filesSelected)
      this.filesSelected = [];
    }else {
      if(!this.filesSelected.length){
        const message = tagMessage.value;
        new_message.subject = message;
      }
    }
    this.messages.push(new_message);
    tagMessage.value = '';
    this.msgService.envoyer(new_message.fromDoctorId, new_message.toPatientId, new_message.subject, new_message.files)
    .subscribe((resp) => {
      this.scrollToBottom()
      console.log(resp);
    })
  }
  deleteFile(index){
    this.filesSelected.splice(index, 1);
  }
  bytesToSize(bytes: number){
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) {
        return '0 Byte';
      }
      // tslint:disable-next-line: radix
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }

  getPatients(){
    this.userService.getAlls(this.user._id)
    .subscribe((res: any) => {
      this.user.patients = res.patients;
      this.patientSelected = this.user.patients[0];
      this.getMessages();
    })
  }
  getMessages(){
    this.msgService.getMessages(this.user._id, this.patientSelected._id)
    .subscribe((resp: any) => {
      this.messages = resp;
      this.messages.sort(
        (messageA, messageB) => new Date(messageA.updatedAt).getTime()  - new Date(messageB.updatedAt).getTime())
      setTimeout(() => {
        this.scrollToBottom();
      }, 100)
    })
  }
}
