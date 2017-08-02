import { Component,Input } from '@angular/core';


@Component({
  selector: 'common-table',
  template: `
    <td>{{phone.score[i].question}}</td><td>{{phone.score[i].score}}</td>
    <td>{{group.score[i].question}}</td><td>{{group.score[i].score}}</td>
    <td>{{onsite1.score[i].question}}</td><td>{{onsite1.score[i].score}}</td>
    <td>{{onsite2.score[i].question}}</td><td>{{onsite2.score[i].score}}</td>
    <td>{{onsite3.score[i].question}}</td><td>{{onsite3.score[i].score}}</td>
  `,
  styles: [`
    td{
      line-height:normal !important;
    }`],
})

export class TableComponent {
  @Input() i: number;
  @Input() phone: any;
  @Input() group: any;
  @Input() onsite1: any;
  @Input() onsite2: any;
  @Input() onsite3: any;
}
