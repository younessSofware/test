import { Patient } from './../../../../models/Patient';
import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Infermerie } from 'src/models/Infermeri';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild('modalData', { static: true }) modalData: ElementRef;
  @Input() element;
  @Input() type;
  @Input() elementDeleted;

  @Output() deleteElement = new EventEmitter();
  @Output() closeModel = new EventEmitter();
  @Output() saveModel = new EventEmitter();
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.triggerModal()
  }
  triggerModal() {
    if(!this.element){
      if(this.type == 'patient'){
        this.element = new Patient('','','','', '', '', '')
      }else{
        this.element = new Infermerie('','','','', '', '', '')
      }
    }
    const content = this.modalData;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModel.emit()
    }, (res) => {
      this.closeModel.emit()
    });
  }
  private getDismissReason(reason: any): string {
    console.log(reason)
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  save(nom, prenom, email, phone){
    const n_element = {
      nom: nom,prenom: prenom, email: email, phone: phone
    };
    if(this.element._id && this.element._id.length){
      n_element['_id'] = this.element._id;
    }
    this.saveModel.emit(n_element);
  }

  deleteP(){
    this.deleteElement.emit();
  }

}
