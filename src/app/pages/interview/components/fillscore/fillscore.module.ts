import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppTranslationModule } from '../../../../app.translation.module';
import { NgaModule } from '../../../../theme/nga.module';
import { Ng2CompleterModule } from "ng2-completer";
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './fillscore.routing';
import { FillScoreComponent } from './fillscore.component';
import { CVComponent } from './cv.component';
import { SumComponent } from './sum.component';
import { CommonComponent } from './common.component';
import { FillScoreService } from './fillscore.service';
import { DefaultModal } from '../../../modal/default-modal/default-modal.component';
import { ModalModule } from '../../../modal/modal.module';
import { MyDatePickerModule } from 'mydatepicker';
import { PeopleModule } from '../../../people/people.module';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    FillScoreComponent,
    CVComponent,
    SumComponent,
    CommonComponent,
  ],
  imports: [
    AppTranslationModule,
    NgaModule,
    CommonModule,
    FormsModule,
    routing,
    Ng2CompleterModule,
    NgbModalModule,
    ModalModule,
    MyDatePickerModule,
    PeopleModule,
  ],
  providers: [
    FillScoreService,
  ],
})
export class FillScoreModule {
}
