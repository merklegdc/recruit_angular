import { Component,OnInit } from '@angular/core';

import { InterviewerService } from './interviewer.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Interviewer } from './Interviewer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from '../../../modal/default-modal/default-modal.component';

@Component({
  selector: 'interviewer',
  templateUrl: './interviewer.html',
  styleUrls: ['./interviewer.scss']
})
export class InterviewerComponent implements OnInit {

  query: string = '';

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmCreate: true
    },
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
      /*interviewer_id: {
        title: 'Interviewer ID',
        type: 'string',
        width: 0,
      },*/
      name: {
        title: 'Interviewer Name',
        type: 'string',
        width: '100px',
      },
      // lastName: {
      //   title: 'Last Name',
      //   type: 'string'
      // },
      level: {
        title: 'Level',
        type: 'html',
        width: '100px',
        editor: {
          type: 'list',
          config: {
            list: [{ value: 'Sr. Analyst', title: 'Sr. Analyst' }, { value: 'Lead Analys', title: 'Lead Analys' }, { value: 'Manager', title: 'Manager' }]
          },
        },
      },
      if_cv: {
        title: 'CV',
        type: 'html',
        width: '100px',
        editor: {
          type: 'list',
          config: {
            list: [{ value: 'Y', title: 'Y' }, { value: 'N', title: 'N' }]
          },
        },
        // width: '200px',
      },
      if_phone: {
        title: 'Phone',
        type: 'html',
        width: '100px',
        editor: {
          type: 'list',
          config: {
            list: [{ value: 'Y', title: 'Y' }, { value: 'N', title: 'N' }]
          },
        },
        // width: '200px',
      },
      if_onsite: {
        title: 'Onsite',
        type: 'html',
        width: '100px',
        editor: {
          type: 'list',
          config: {
            list: [{ value: 'Y', title: 'Y' }, { value: 'N', title: 'N' }]
          }
        }
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
      service_line:{
        title: 'Service Line',
        type: 'html',
        width: '150px',
        editor: {
          type: 'list',
          config: {
            list: [{ value: 'Data Management', title: 'Data Management' }, { value: 'Data Products & Insights & O &CA', title: 'Data Products & Insights & O &CA' },
              { value: 'Analytics', title: 'Analytics' }, { value: 'Technology', title: 'Technology' },{ value: 'Customer Experience', title: 'Customer Experience' },
              { value: 'Products', title: 'Products' }]
          }
        }
      },
      nominated_by:{
        title: 'Nominated By',
        type: 'string',
        width: '100px',
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();
  interviewers: Interviewer[];

  constructor(protected service: InterviewerService, private modalService: NgbModal) {}
  
  ngOnInit(): void {
    this.service.ifValidUser()
    .then(data => {
      if (data ===  'access denied') {
        this.openModal('Access Denied', 'you dont have permision, pls contact system admin?');
      }
    })
    this.getInterviewers();
  }
  getInterviewers(): void {
    this.service.getInterviewer()
    .then( data => this.interviewers = data)
    .then(data => this.source.load(this.interviewers));
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.deleteInterviewer(event.data.interviewer_id)
        .then(data => event.confirm.resolve());
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event): void {
    this.service.addInterviewer(event.newData)
      .then(data => event.newData.interviewer_id = data)
      .then(data => event.confirm.resolve(event.newData));
  }
  onEditConfirm(event): void {
    this.service.saveInterviewer(event.data.interviewer_id, event.newData)
      .then(data => event.confirm.resolve(event.newData));
  }
  openModal(header: string, content?: string){
    const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
    activeModal.componentInstance.modalHeader = header;
    activeModal.componentInstance.modalContent = content;
  }
}
