import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2CompleterModule } from "ng2-completer";

import { routing } from './people.routing';

import { People } from './people.component';
import { InterviewerComponent } from './components/interviewer';
import { AddCandidateComponent } from './components/candidate/addCandidate.component';
import { ViewCandidateComponent } from './components/candidate/viewCandidate.component';
//
// import { InlineForm } from './components/candidate/components/inlineForm';
// import { BlockForm } from './components/candidate/components/blockForm';
// import { HorizontalForm } from './components/candidate/components/horizontalForm';
// import { BasicForm } from './components/candidate/components/basicForm';
// import { WithoutLabelsForm } from './components/candidate/components/withoutLabelsForm';

import { InterviewerService } from './components/interviewer/interviewer.service';
import { CandidateService } from './components/candidate/candidate.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    AppTranslationModule,
    NgaModule,
    NgbRatingModule,
    routing,
    Ng2SmartTableModule,
    Ng2CompleterModule,
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
    CandidateService
  ],
})
export class PeopleModule {
}
