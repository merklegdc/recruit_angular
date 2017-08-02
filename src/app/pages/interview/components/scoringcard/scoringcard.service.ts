import {Injectable} from '@angular/core';
import * as Global from '../../../global';
import 'rxjs/add/operator/map';
import { Observable }     from 'rxjs/Observable';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class ScoringCardService {

  private candidateUrl = Global.baseUrl+'candidate';
  private headers = new Headers({'Content-Type': 'application/json'});
  private interviewUrl = Global.baseUrl+'interview';

  tableData = [
    ["Interviewer","","","","","","","","","","","",""],
    ["Trainable/Culture fit 40%","Desire to Serve (Interpersonal)","10%","","","","","","","","","",""],
    ["","Desire to Learn (Intellectual)","20%","","","","","","","","","",""],
    ["","Desire to Achieve (Result Driven)","10%","","","","","","","","","",""],
    ["","Total","40%","","","","","","","","","",""],
    ["Acadamitic/Tech. Skill (SAS,SQL,etc.) 35%","Technical Skill Set (SAS,SQL,etc.)","10%","","","","","","","","","",""],
    ["","Examination Result (Pass 0.5, Fail 0)","10%","","","","","","","","","",""],
    ["","Academic Achievements, School Project & Internship Experience for Campus Hire","15%","","","","","","","","","",""],
    ["","Total","35%","","","","","","","","","",""],
    ["Potential Management Skill 5%","Business Knowledge","2.5%","","","","","","","","","",""],
    ["","People Management Experience","2.5%","","","","","","","","","",""],
    ["","Total","5%","","","","","","","","","",""],
    ["Communication (Chinese & English) & Logical Language Structure Competence 20%","Communication Skill both in English and Chinese","10%","","","","","","","","","",""],
    ["","Language Skill/Logical Language Structure Competence","10%","","","","","","","","","",""],
    ["","Total","20%","","","","","","","","","",""],
    ["Add-on","Hometown & Family Tie (Nanjing = 0.3, Jiangsu&Anhui = 0.1, Others = 0)","","","","","","","","","","",""],
    ["","Overseas Study Experience (Yes = 0.1, No = 0)","","","","","","","","","","",""],
    ["","Relevant Working Experience (Yes = 0.1, No = 0)","","","","","","","","","","",""],
    ["Overall Assessment","(>=3.5,Pass; <3.5,Fail & Other Comments)","","","","","","","","","","",""],
    ["Comments by CV Screeners/Interviewers(If necessary)","","","","","","","","","","","",""],
    ["Hiring Decision/Comments by Service Line Lead","","","","","","","","","","","",""]
  ];

  getTableData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.tableData);
      }, 0);
    });
  }
  search(id: number): Observable<any>{
    return this.http
      .get(`${this.candidateUrl}/id/${id}`)
      .map(response => response.json());
  }
  //handle multiple http requests
  getInterview(id){
    var ids:number[] = [0,1,2,3,4,5,6];
    return Observable.forkJoin(
      ids.map(
        i => this.http.get(`${this.interviewUrl}/id/${id}/type/${i}`)
          .map(res => res.json())
      ));
  }
  constructor(private http: Http) {
    this.headers.append('Access-Control-Allow-Origin', '*');
  }
}
