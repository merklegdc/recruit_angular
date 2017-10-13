import { Injectable } from '@angular/core';
import { Interview } from '../../../people';
// import * as Global from '../../../global';
import { environment } from '../../../../../environments/environment';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Headers, Http } from '@angular/http';

@Injectable()
export class FillScoreService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private candidateUrl = `${environment.candidateUrl}candidate`;
  private interviewerUrl = `${environment.interviewerUrl}interviewer`;
  private interviewUrl = `${environment.interviewUrl}interview`;

  constructor(private http: Http) {
    this.headers.append('Access-Control-Allow-Origin', '*');
  }
  ifValidUser(): Promise<any> {
    return this.http.get(`${environment.indexUrl}index`)
    .toPromise()
    .then(data => data.json());
  }
  searchCandidate(id: number): Observable<any> {
    return this.http
      .get(`${this.candidateUrl}/id/${id}`)
      .map(response => response.json());
  }
  searchInterviewer(id: number): Observable<any>{
    return this.http
      .get(`${this.interviewerUrl}/id/${id}`)
      .map(response => response.json());
  }
  addInterview(data): Promise<any> {
    return this.http.post(this.interviewUrl, data)
      .toPromise()
      .then(response => response.json());
  }

  saveInterview(id: number, type: number, data: Interview): Promise<any> {
    return this.http.post(`${this.interviewUrl}/id/${id}/type/${type}`, data)
      .toPromise()
      .then(response => response.json());
  }

  getInterview(id: number, type: number): Promise<Interview> {
    return this.http.get(`${this.interviewUrl}/id/${id}/type/${type}`)
      .toPromise()
      .then(response => response.json()[0]);
  }
  getInterviews(id, type) {
    const ids: number[] = [type, 6];
    return Observable.forkJoin(
      ids.map(
        i => this.http.get(`${this.interviewUrl}/id/${id}/type/${i}`)
          .map(res => res.json())));
  }
}
