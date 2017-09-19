import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbRatingModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2CompleterModule } from 'ng2-completer';
import { HotTableModule } from 'ng2-handsontable';

import { routing } from './people.routing';

import { People } from './people.component';
import { InterviewerComponent } from './components/interviewer';
import { AddCandidateComponent } from './components/candidate/addCandidate.component';
import { ViewCandidateComponent } from './components/candidate/viewCandidate.component';

import { InterviewerService } from './components/interviewer/interviewer.service';
import { CandidateService } from './components/candidate/candidate.service';
import { MyDatePickerModule } from 'mydatepicker';
import { DefaultModal } from '../modal/default-modal/default-modal.component';
import { ModalModule } from '../modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    AppTranslationModule,
    NgaModule,
    NgbModalModule,
    NgbRatingModule,
    NgbDropdownModule,
    routing,
    Ng2SmartTableModule,
    Ng2CompleterModule,
    MyDatePickerModule,
    ModalModule,
    HotTableModule,
    ],
  declarations: [
    InterviewerComponent,
    People,
    AddCandidateComponent,
    ViewCandidateComponent,
    // InlineForm,
    // BlockForm,
    // HorizontalForm,
    // BasicForm,
    // WithoutLabelsForm,
  ],
  providers: [
    InterviewerService,
    CandidateService,
  ],
})
export class PeopleModule {
}
