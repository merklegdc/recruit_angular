import {Component} from '@angular/core';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {
  docUrl = `${environment.downloadUrl}downloadDoc`;
  constructor() {
  }

}
