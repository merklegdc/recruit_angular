import { Injectable } from '@angular/core';
import { Interview } from '../../data';
import * as Global from '../../../global';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Headers, Http } from '@angular/http';

@Injectable()
export class FillScoreService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private candidateUrl = Global.baseUrl+'candidate';
  private interviewerUrl = Global.baseUrl+'interviewer';
  private interviewUrl = Global.baseUrl+'interview';

  constructor(private http: Http) {
    this.headers.append('Access-Control-Allow-Origin', '*');
  }
  searchCandidate(id: number): Observable<any>{
    return this.http
      .get(`${this.candidateUrl}/id/${id}`)
      .map(response => response.json());
  }
  searchInterviewer(id: number): Observable<any>{
    return this.http
      .get(`${this.interviewerUrl}/id/${id}`)
      .map(response => response.json());
  }
  tableData = [
    ["Trainable/Culture fit 40%","Desire to Serve (Interpersonal)","10%",""],
    ["","Desire to Learn (Intellectual)","20%",""],
    ["","Desire to Achieve (Result Driven)","10%",""],
    ["","Total","40%",""],
    ["Acadamitic/Tech. Skill (SAS,SQL,etc.) 35%","Technical Skill Set (SAS,SQL,etc.)","10%",""],
    ["","Examination Result (Pass 0.5, Fail 0)","10%",""],
    ["","Academic Achievements, School Project & Internship Experience for Campus Hire","15%",""],
    ["","Total","35%",""],
    ["Potential Management Skill 5%","Business Knowledge","2.5%",""],
    ["","People Management Experience","2.5%",""],
    ["","Total","5%",""],
    ["Communication (Chinese & English) & Logical Language Structure Competence 20%","Communication Skill both in English and Chinese","10%",""],
    ["","Language Skill/Logical Language Structure Competence","10%",""],
    ["","Total","20%",""],
    ["Add-on","Hometown & Family Tie",""],
    ["","Overseas Study Experience",""],
    ["","Relevant Working Experience","",""],
    ["Overall Assessment","(>=3.5,Pass; <3.5,Fail & Other Comments)",""]
  ];

  getTableData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.tableData);
      }, 0);
    });
  }

  addInterview(data): Promise<any> {
    return this.http.post(this.interviewUrl, data, this.headers)
      .toPromise()
      .then(response => response.json());
  }

  saveInterview(id, data): Promise<any> {
    return this.http.post(`${this.interviewUrl}/id/${id}`, data)
      .toPromise()
      .then(response => response.json());
  }

  getInterview(id, type): Promise<any> {
    return this.http.get(`${this.interviewUrl}/id/${id}/type/${type}`)
      .toPromise()
      .then(response => response.json());
  }
  getInterviews(id, type) {
    const ids: number[] = [type, 6];
    return Observable.forkJoin(
      ids.map(
        i => this.http.get(`${this.interviewUrl}/id/${id}/type/${i}`)
          .map(res => res.json())));
  }

  private interview = new Interview();
}
