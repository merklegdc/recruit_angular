import { Routes, RouterModule } from '@angular/router';

import { Interview } from './interview.component';
import { ScoringCardComponent } from './components/scoringcard';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Interview,
    children: [
      { path: 'scoringcard', component: ScoringCardComponent },
      { path: 'fillscore', loadChildren: './components/fillscore/fillscore.module#FillScoreModule' }
    ],
  },
];

export const routing = RouterModule.forChild(routes);
