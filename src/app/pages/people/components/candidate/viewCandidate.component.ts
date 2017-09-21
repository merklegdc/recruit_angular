import { Component, OnInit, ViewChild } from '@angular/core';
// import * as Global from '../../../global';
import { environment } from '../../../../../environments/environment';
import { Candidate } from './candidate';
import { CandidateService } from './candidate.service';
import { HotTableModule } from 'ng2-handsontable';
import { NgUploaderOptions } from 'ngx-uploader';
import { DefaultModal } from '../../../modal/default-modal/default-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from "file-saver";
import { BaFileUploader } from '../../../../theme/components/baFileUploader/baFileUploader.component'

@Component({
  selector: 'view-candidate',
  templateUrl: './viewCandidate.html',
  styleUrls: ['./candidate.scss', 'viewCandidate.scss'],
})
export class ViewCandidateComponent implements OnInit {
  @ViewChild(BaFileUploader) uploader: BaFileUploader;
  fileUploaderOptions: NgUploaderOptions = {
    url: `${environment.uploadUrl}uploadExcel`,
  };
  data: any[] = [['false', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']]; 
  colHeaders: string[] = ['','查重', 'Candidate ID', 'Name (CN)', 'Name (ENG)', 'Assign Date',
    'Service Line', 'Position', 'Location', 'Gender', 'Degree', 'University',
    'Major', 'Graduation Date', 'Cell Phone', 'Email', 'Received Date', 'Channel', 'Channel Detail', 'CV Sreen Coordinator',
    'CV Screen Result', 'CV Status', 'Phone Screener', 'Phone Screen Date', 'Phone Screen Result', 'Comments',
    'On-site Date', 'interviewer1-Name', 'interview1-score', 'interview1 comments', 'interviewer2-Name',
    'interview2-score', 'interview2 comments', 'interviewer3-Name', 'interview3-score', 'interview3 comments',
    'On-site Result'];
  columns: any[] = [
    {
      type: "checkbox",
    },{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
  ];
  private colWidths: number[] = [];
  options: any = {
    width: 1300,
    height: 500,
    rowHeights: 23,
    colWidths: [25, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    allowInsertRow: true,
    stretchH: 'all',
    columnSorting: true,
    contextMenu: [
      'row_above', 'row_below', 'remove_row',
    ],
  };

  private afterChange(e: any) {
  }

  private afterOnCellMouseDown(e: any) {
  }

  candidates: Candidate[];

  constructor(protected service: CandidateService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getCandidates();
  }
  onImported(event): void {
    let data = JSON.parse(event.response);
    for (let i in data){
      data[i] = [''].concat(data[i]);
    }
    data = this.helper(data);
    this.data = data;
  }
  getCandidates(): void {
    this.service.getCandidate().then( data => this.candidates = data).then();
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
    this.service.saveCandidate(event.data.interviewer_id, event.newData)
      .then(data => event.confirm.resolve(event.newData));
  }
  clickExportExcel(): void {
    this.service.downloadExcel(this.data)
    .subscribe(blob => { saveAs(blob, 'Campus Tracking.xlsx');
    })
  };
  clickDelete(): void {
    const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
    activeModal.componentInstance.modalHeader = 'Unavailable';
    activeModal.componentInstance.modalContent = 'This functionality is still under development.';
  }
  
  clickExportServer(): void {
    
    this.service.uploadData(this.data)
    .then(data => { if (data) {
      const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
      activeModal.componentInstance.modalHeader = 'Success';
    }})
    .catch(error => {
      const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
      activeModal.componentInstance.modalHeader = 'Error';
    });
  }
  clickImportServer(): void {
    this.service.downloadData()
    .then(data => { if (data) {
      data = this.helper(data);
      this.data = data;
      const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
      activeModal.componentInstance.modalHeader = 'Success';
    }})
    .catch(error => {
      const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
      activeModal.componentInstance.modalHeader = 'Error';
    });
  }
  clickAssign(): void {
    let d = new Date();
    let dd = d.getDate();
    let mm = d.getMonth()+1; //January is 0!
    let yyyy = d.getFullYear();
    let dds: string = dd.toString();
    let mms: string = mm.toString();
    if(dd<10) {
        dds = '0'+dd;
    } 
    
    if(mm<10) {
        mms = '0'+mm;
    } 
    let today = `${yyyy}-${mms}-${dds}`;
    for (let i in this.data){
      this.data[i][5] = this.data[i][0] ? today: this.data[i][5];
    }
  }
  clickImportExcel(): void {
    this.uploader.bringFileSelector();
  }
  helper(data): any {
    let name = new Set();
    for (let i in data){
      let s = name.size;
      name.add(data[i][3]);
      if (name.size == s){
        data[i][1] = 1;
      }else {
        data[i][1] = 0;
      }
      data[i][0] = data[i][5] ? false: true;
    }
    return data;
  }
}
