import {Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Interviewer } from './interviewer';
import * as Global from '../../../global'

import 'rxjs/add/operator/toPromise';
@Injectable()
export class InterviewerService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private interviewerUrl = Global.baseUrl+'interviewer';

  constructor(private http: Http) { }

  getInterviewer(): Promise<Interviewer[]> {
    return this.http.get(this.interviewerUrl)
      .toPromise()
      .then(response => response.json() as Interviewer[])
      .catch(this.handleError);
  }



  addInterviewer(data): Promise<any> {
    return this.http.post(this.interviewerUrl,data,{headers: this.headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  saveInterviewer(id,data): Promise<any> {
    return this.http.put(this.interviewerUrl+'/id/'+id,data,{headers: this.headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  deleteInterviewer(id: number): Promise<void> {
    const url = `${this.interviewerUrl}/id/${id}`;
    return this.http.delete(url,{headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
