import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
import { Candidate, Interview } from './candidate';
// import * as Global from '../../../global';
import { environment } from '../../../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
@Injectable()
export class CandidateService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private candidateUrl = `${environment.candidateUrl}candidate`;

  constructor(private http: Http) { }

  getCandidate(id: number): Promise<Candidate> {
    return this.http.get(`${this.candidateUrl}/id/${id}`)
      .toPromise()
      .then(response => response.json()[0]);
  }
  getVWCandidate(id: number): Promise<Candidate> {
    return this.http.get(`${environment.candidateUrl}vwcandidate/id/${id}`)
      .toPromise()
      .then(response => response.json()[0]);
  }
  addCandidate(data): Promise<any> {
    return this.http.post(this.candidateUrl, data, { headers: this.headers })
      .toPromise()
      .then(response => response.json());
  }

  saveCandidate(id, data, type?): Promise<any> {
    return this.http.post(`${this.candidateUrl}/id/${id}`, data, { headers: this.headers })
      .toPromise()
      .then(response => response.json());
  }

  deleteCandidates(ids: number[]){
    return Observable.forkJoin(
      ids.map(
        i => this.http.get(`${environment.candidateUrl}deleteCandidate/id/${i}`)
          .map(res => res.json())));
  }
  deleteCandidate(id: number): Promise<void> {
    const url = `${this.candidateUrl}/id/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  uploadData(data): Promise<void> {
    return this.http.post(`${environment.uploadUrl}uploadData`, data, { headers: this.headers })
    .toPromise()
    .then(response => response.json());
  }

  downloadExcel(data): Observable<Blob> {
    let options = new RequestOptions({responseType: ResponseContentType.Blob });
    return this.http.get(`${environment.downloadUrl}downloadExcel`, options)
        .map(res => res.blob())
        .catch(this.handleError)
  }

  downloadData(): Promise<any> {
    return this.http.get(`${environment.downloadUrl}downloadData`, { headers: this.headers })
    .toPromise()
    .then(response => response.json());
  }

  ifValidUser(): Promise<any> {
    return this.http.get(`${environment.indexUrl}index`)
    .toPromise()
    .then(data => data.json())
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
