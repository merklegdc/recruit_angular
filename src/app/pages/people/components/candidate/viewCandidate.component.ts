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
import { BaFileUploader } from '../../../../theme/components/baFileUploader/baFileUploader.component';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';

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
  nameService: CompleterData;
  ifCheckUnassigned: boolean = false;
  name: any;
  selectedSL = {
    'Marketing_Technology': true,
    'Analytics_and_Data_Products': true,
    'Digital_Marketing': true,
    'Digital_Analytics': true,
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
    { data: 'cv_name' },
    { data: 'cv_result' },
    {},
    { data: 'phone_name' },
    { data: 'phone_date' },
    { data: 'phone_result' },
    { data: 'phone_comment' },
    { data: 'onsite_date' },
    { data: 'onsite1_name' },
    { data: 'onsite1_score' },
    { data: 'onsite1_comment' },
    { data: 'onsite2_name' },
    { data: 'onsite2_score' },
    { data: 'onsite2_comment' },
    { data: 'onsite3_name' },
    { data: 'onsite3_score' },
    { data: 'onsite3_comment' },
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

  constructor(protected service: CandidateService, private modalService: NgbModal, private completerService: CompleterService) {

    this.nameService = completerService
    .remote(environment.SearchUrl+'searchCandidate/name/', 'name', 'name').descriptionField('description');;
  }

  ngOnInit(): void {
    this.service.ifValidUser()
    .then(data => {
      if (data ===  'access denied') {
        this.openModal('Access Denied', 'you dont have permision, pls contact system admin?');
      }
    })
  }
  onCheckUnassigned(): void {
    if (this.ifCheckUnassigned) {
      this.checkUnassigned(this.data);
    }else {
      this.unCheckUnassigned(this.data);
    }
  }
  onImported(event): void {
    this.data = JSON.parse(event.response);
    this.checkUnassigned(this.data);
  }
  onExportExcel(): void {
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
        .subscribe(res => {
          this.onQuery();
        });
    }
  }
  
  onSave(): void {
    this.service.uploadData(this.data)
    .then(data => { if (data) {
     this.openModal('success');
    }})
    .catch(error => {
      this.openModal('error');
    });
  }
  onSLChange(): void {
    let temp = [];
    for (let item of this.__data) {
      for (let key in this.selectedSL) {
        if (item.service_line.replace(/ /g, '_') === key && this.selectedSL[key]){
          temp.push(item);
        }
      }
    }
    this.data = temp[0]? temp: [createCandidate()];
  }
  onQuery(): void {
    this.service.downloadData()
    .then(data => { if (data) {
      if (data === 'access denied') {
        this.openModal('Access Denied', 'Sorry, you donnot have permission to do this.');
        return;
      }
      this.__data = data;
      this.data = data;
      // this.onSLChange();
      this.onCheckUnassigned();
      this.selectedSL = {
        'Marketing_Technology': true,
        'Analytics_and_Data_Products': true,
        'Digital_Marketing': true,
        'Digital_Analytics': true,
      };
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
  onImportExcel(): void {
    this.uploader.bringFileSelector();
  }
  onSelectName(selected): void {
    if (selected) {
      this.service.getVWCandidate(selected.originalObject.candidate_id)
      .then(res => {
        res.check = false;
        this.data = [res]});
    }
  }
  checkUnassigned(data): void {
    for (let item of data) {
      item.check = item.assign_date ? false: true;
    }
  }
  unCheckUnassigned(data): void {
    for (let item of data) {
      item.check = false;
    }
  }
  openModal(header: string, content?: string){
    const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
    activeModal.componentInstance.modalHeader = header;
    activeModal.componentInstance.modalContent = content;
  }

}
