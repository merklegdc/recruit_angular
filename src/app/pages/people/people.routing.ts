import { Routes, RouterModule } from '@angular/router';

import { People } from './people.component';
import { InterviewerComponent } from './components/interviewer/interviewer.component';
import { AddCandidateComponent } from './components/candidate/addCandidate.component';
import { ViewCandidateComponent } from './components/candidate/viewCandidate.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: People,
    children: [
      { path: 'interviewer', component: InterviewerComponent },
      { path: 'addCandidate', component: AddCandidateComponent },
      { path: 'viewCandidate', component: ViewCandidateComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
