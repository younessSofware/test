import { User } from './../../../../models/User';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-biblio',
  templateUrl: './biblio.component.html',
  styleUrls: ['./biblio.component.scss']
})
export class BiblioComponent implements OnInit {
  user
  files = [];
  constructor() {}

  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  FileSelected(event){
    for(let i=0; i<event.files.length; i++){
      if(this.files.indexOf(event.files[i]) == -1) this.files.push(event.files[i])
    }
  }
    
 

}
