import { Component } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import * as Global from '../../../global';
import { Candidate } from './candidate';
import { CandidateService } from './candidate.service';
import { CompleterService, CompleterData,CompleterItem } from 'ng2-completer';

@Component({
  selector: 'addCandidate',
  templateUrl: './addCandidate.html',
  styleUrls: ['./candidate.scss'],
})

export class AddCandidateComponent {
  protected searchStr: string;
  protected dataService: CompleterData;
  title = 'Add Candidate';
  candidate:Candidate = new Candidate();

  onSubmit(){
    this.service.addCandidate(this.candidate)
      .then(data => this.candidate=new Candidate());
  }
  update(){
    //this.service.search(this.candidate.name).subscribe(res => this.candidate=res[0]);
  }
  onSelect(selected){
    if (selected) {
      this.service.search(selected.originalObject.candidate_id).subscribe(res => this.candidate=res[0]);
    } else {
    }
  }
  public fileUploaderOptions:NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: Global.baseUrl+'upload/name/test',
  };

  constructor(protected service: CandidateService,private completerService: CompleterService) {
    this.dataService = completerService.remote(Global.baseUrl+'searchCandidate/name/', 'name', 'name').descriptionField("description");
  }

  ngAfterViewInit(){
  }
}
