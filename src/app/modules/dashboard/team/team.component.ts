import { InfermerieService } from './../../../services/infermerie.service';
import { UserService } from './../../../services/user.service';
import { User } from './../../../../models/User';
import { Component, OnInit } from '@angular/core';
import { Infermerie } from 'src/models/Infermeri';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  user;
  addInfermerie = false;

  infermeris: Infermerie[] = [];
  infermerieEdit: Infermerie;
  infermerieDeleted: Infermerie;
  constructor(private userService: UserService, private infermerieService: InfermerieService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getInfermeris();
  }

  getInfermeris(){
    this.userService.getAlls(this.user._id)
    .subscribe((resp: any) => {
      //this.patients = resp.patients;
      this.infermeris = resp.infermeris;
    });
  }
  save(infermerie){
    if(infermerie._id){
      this.infermerieService.modifyInfermerie(infermerie).
      subscribe((resp) => {
        console.log(resp)
        const index = this.infermeris.findIndex(pat => pat._id == infermerie._id);
        this.infermeris[index] = infermerie;
      })
    }else{
      this.infermerieService.addInfermerie(infermerie, this.user._id).
      subscribe((resp) => {
        console.log(resp)
        this.infermeris.push(infermerie)
      })

    }
  }
  deleteP(){
    this.infermerieService.deleteInfermerie(this.infermerieDeleted._id, this.user._id)
    .subscribe((resp) => {
      const index = this.infermeris.findIndex(infermerie => infermerie == this.infermerieDeleted );
      this.infermeris.splice(index, 1);
    })
  }

}
