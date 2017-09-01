import { Component,OnInit } from '@angular/core';
import * as Global from '../../../global';
import { Candidate } from './candidate';
import { CandidateService } from './candidate.service'
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'view-candidate',
  templateUrl: './viewCandidate.html',
  styleUrls: ['./candidate.scss','viewCandidate.scss']
})
export class ViewCandidateComponent implements OnInit {

  query: string = '';

  settings = {
    actions:{
      add:false
    },
    /*add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmCreate: true
    },*/
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      candidate_id: {
        title: 'ID',
        type: 'string',
        width: '200px',
        editable: false,
      },
      name: {
        title: 'Candidate Name',
        type: 'string',
        width: '200px',
      },
      status: {
        title: 'Status',
        editable:false,
        type: 'string',
        width: '200px',
      },
      department: {
        title: 'Department',
        type: 'string',
        width: '200px',
      },
      gender: {
        title: 'Gender',
        type: 'string',
        width: '200px',
      },
      level: {
        title: 'Level',
        type: 'string',
        width: '200px',
      },
      phone: {
        title: 'Phone',
        type: 'string',
        width: '200px',
      },
      email: {
        title: 'Email',
        type: 'string',
        width: '200px',
      },
      location: {
        title: 'Location',
        type: 'html',
        width: '100px',
        editor: {
          type: 'list',
          config: {
            list: [{ value: 'NJ', title: 'NJ' }, { value: 'SH', title: 'SH' }]
          }
        }
      },
      /*birthday: {
        title: 'brithday',
        type: 'string',
        width: '200px',
      },*/
      /*channel: {
        title: 'Channel',
        type: 'string',
        width: '200px',
      },*/
      /*recommender: {
        title: 'Recommender',
        type: 'string',
        width: '100px',
      },
      receive_date:{
        title: 'Receive_date',
        type: 'string',
        width: '150px',
      },
      bachelor_school:{
        title: 'Bachelor School',
        type: 'string',
        width: '300px',
      },
      bachelor_date:{
        title: 'Bachelor Date',
        type: 'string',
        width: '100px',
      },
      bachelor_major:{
        title: 'Bachelor Major',
        type: 'string',
        width: '100px',
      },
      master_school:{
        title: 'Master School',
        type: 'string',
        width: '300px',
      },
      master_date:{
        title: 'Master Date',
        type: 'string',
        width: '100px',
      },
      master_major:{
        title: 'Master Major',
        type: 'string',
        width: '100px',
      }*/
    }
  };

  source: LocalDataSource = new LocalDataSource();
  candidates:Candidate[];

  constructor(protected service: CandidateService) {}

  ngOnInit(): void {
    this.getCandidates();
  }
  getCandidates():void{
    this.service.getCandidate().then( data => this.candidates=data).then(data => this.source.load(this.candidates));
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.deleteCandidate(event.data.candidate_id)
        .then(data => event.confirm.resolve());
    } else {
      event.confirm.reject();
    }
  }
  onEditConfirm(event): void {
    this.service.saveCandidate(event.data.interviewer_id,event.newData)
      .then(data => event.confirm.resolve(event.newData));
  }

}
