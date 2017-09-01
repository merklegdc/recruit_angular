import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './interview.routing';
import { Ng2CompleterModule } from "ng2-completer";

import { Interview } from './interview.component';
import { ScoringCardComponent } from './components/scoringcard';
import { TableComponent } from './components/commonTable';
import {ScoringCardService} from "./components/scoringcard/scoringcard.service";
import { FillScoreService } from "./components/fillscore/fillscore.service"


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
    ScoringCardComponent,
    Interview,
    TableComponent
    // InlineForm,
    // BlockForm,
    // HorizontalForm,
    // BasicForm,
    // WithoutLabelsForm,
  ],
  providers: [
    ScoringCardService,
    FillScoreService,
  ],
})
export class InterviewModule {
}
