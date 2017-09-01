import {Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Candidate } from './candidate';
import * as Global from '../../../global';
import 'rxjs/add/operator/map';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
@Injectable()
export class CandidateService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private candidateUrl = Global.baseUrl+'candidate';

  constructor(private http: Http) { }

  search(id: number): Observable<Candidate>{
    return this.http
      .get(`${this.candidateUrl}/id/${id}`)
      .map(response => response.json() as Candidate);
  }

  getCandidate(): Promise<Candidate[]> {
    return this.http.get(this.candidateUrl)
      .toPromise()
      .then(response => response.json() as Candidate[])
      .catch(this.handleError);
  }

  addCandidate(data): Promise<any> {
    return this.http.post(this.candidateUrl, data, { headers: this.headers })
      .toPromise()
      .then(response => response.json());
  }

  saveCandidate(id, data): Promise<any> {
    return this.http.post(`${this.candidateUrl}/id/${id}`, data, { headers: this.headers })
      .toPromise()
      .then(response => response.json());
  }

  deleteCandidate(id: number): Promise<void> {
    const url = `${this.candidateUrl}/id/${id}`;
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
