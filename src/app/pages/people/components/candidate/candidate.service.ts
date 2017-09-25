import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
import { Candidate } from './candidate';
// import * as Global from '../../../global';
import { environment } from '../../../../../environments/environment';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
@Injectable()
export class CandidateService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private candidateUrl = `${environment.candidateUrl}candidate/`;

  constructor(private http: Http) { }

  search(id: number): Observable<Candidate> {
    return this.http
      .get(`${this.candidateUrl}/id/${id}`)
      .map(response => response.json() as Candidate);
  }

  getCandidate(id: number, type: number): Promise<any> {
    return this.http.get(`${this.candidateUrl}id/${id}/type/${type}`)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
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

  downloadData(): Promise<any[]> {
    return this.http.get(`${environment.downloadUrl}downloadData`, { headers: this.headers })
    .toPromise()
    .then(response => response.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
