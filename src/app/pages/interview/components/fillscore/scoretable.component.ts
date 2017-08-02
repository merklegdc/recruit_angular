import { Component,Input } from '@angular/core';
import * as Data from '../../data'

@Component({
  selector: 'fillscore',
  template: `
    <hot-table [data]="data" [options]="options"></hot-table>
  `
})
export class ScoreTableComponent {
  title = 'Tour of Heroes';
}
