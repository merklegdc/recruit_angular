import { Component, OnInit, ViewChild } from '@angular/core';
// import * as Global from '../../../global';
import { environment } from '../../../../../environments/environment';
import { Candidate, createCandidate } from './candidate';
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
  selectedSL = {
    'Marketing': true,
    'Analytics': true,
    'ADigital': true,
    'Digital': true,
  };
  // data: any[] = [[false, '', , '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  // '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']]; 
  __data: any[];
  data: any[] = [createCandidate()];
  colHeaders: string[] = ['', 'Status', 'Active', 'Candidate ID', 'Name (CN)', 'Name (ENG)', 'Assign Date',
    'Service Line', 'Position', 'Location', 'Gender', 'Degree', 'University',
    'Major', 'Graduation Date', 'Cell Phone', 'Email', 'Received Date', 'Channel', 'Channel Detail', 'CV Sreen Coordinator',
    'CV Screen Result', 'CV Status', 'Phone Screener', 'Phone Screen Date', 'Phone Screen Result', 'Comments',
    'On-site Date', 'interviewer1-Name', 'interview1-score', 'interview1 comments', 'interviewer2-Name',
    'interview2-score', 'interview2 comments', 'interviewer3-Name', 'interview3-score', 'interview3 comments',
    'On-site Result'];
  columns: any[] = [
    { data: 'check',
      type: "checkbox",
    },
    { data: 'status' },
    { data: 'if_active' },
    { data: 'candidate_id' },
    { data: 'name_cn' },
    { data: 'name_en' },
    { data: 'assign_date' },
    { data: 'service_line' },
    { data: 'position' },
    { data: 'location' },
    { data: 'gender' },
    { data: 'degree' },
    { data: 'university' },
    { data: 'major' },
    { data: 'graduation_date' },
    { data: 'phone' },
    { data: 'email' },
    { data: 'receive_date' },
    { data: 'channel' },
    { data: 'recommender' },
    {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
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
    dropdownMenu: true,
    filters: true,
  };

  private afterChange(e: any) {
  }

  private afterOnCellMouseDown(e: any) {
  }

  candidates: Candidate[];

  constructor(protected service: CandidateService, private modalService: NgbModal) {}

  ngOnInit(): void {
  }
  onImported(event): void {
    this.data = [];
    let data = JSON.parse(event.response);
    for (let item of data){
      let candidate = createCandidate();
      let i = 0;
      for (let key in candidate) {
        candidate[key] = item[i++];
        // console.log(key);
      }
      this.data.push(candidate);
    }
    this.checkUnassigned();
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
  onDelete(): void {
    if (window.confirm('Are you sure you want to delete?')) {
      let id: number[] = [];
      for (let item of this.data) {
        if (item.check) {
          id.push(item.candidate_id);
        }
      }
      this.service.deleteCandidates(id)
        .subscribe(data => {
          if (data) this.openModal('success');
          this.service.downloadData()
          .then(data => { if (data) {
            this.checkUnassigned();
            this.data = data;
          }})
        });
    }
    
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
  onSLChange(): void {
    let temp = [createCandidate()];
    for (let item of this.__data) {
      for (let key in this.selectedSL) {
        if (item.service_line.indexOf(key) === 0 && this.selectedSL[key]){
          temp.push(item);
        }
      }
    }
    this.data = temp;
  }
  onQuery(): void {
    this.service.downloadData()
    .then(data => { if (data) {
      // console.log(data);
      this.__data = data;
      this.onSLChange();
      this.checkUnassigned();
      this.openModal('success');
    }})
    .catch(error => {
      this.openModal('Error');
    });
  }
  onAssign(): void {
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
    for (let item of this.data){
      item.assign_date = item.check ? today: item.assign_date;
    }
  }
  clickImportExcel(): void {
    this.uploader.bringFileSelector();
  }
  checkUnassigned(): void {
    for (let item of this.data){
      item.check = item.assign_date ? false: true;
    }
  }
  
  openModal(header: string, content?: string){
    const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
    activeModal.componentInstance.modalHeader = header;
    activeModal.componentInstance.modalContent = content;
  }
}
