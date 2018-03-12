import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Interviewer } from './interviewer';
// import * as Global from '../../../global';
import { environment } from '../../../../../environments/environment';

import 'rxjs/add/operator/toPromise';
@Injectable()
export class InterviewerService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private interviewerUrl = `${environment.interviewerUrl}interviewer`;

  constructor(private http: Http) { }

  getInterviewer(): Promise<Interviewer[]> {
    return this.http.get(this.interviewerUrl)
      .toPromise()
      .then(response => response.json() as Interviewer[])
      .catch(this.handleError);
  }

  addInterviewer(data): Promise<any> {
    return this.http.post(this.interviewerUrl, data, { headers: this.headers })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  saveInterviewer(id, data): Promise<any> {
    return this.http.post(`${this.interviewerUrl}/id/${id}`, data, { headers: this.headers })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  deleteInterviewer(id: number): Promise<void> {
    const url = `${environment.interviewerUrl}deleteInterviewer/id/${id}`;
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  ifValidUser(): Promise<any> {
    return this.http.get(`${environment.indexUrl}index`)
    .toPromise()
    .then(data => data.json());
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
