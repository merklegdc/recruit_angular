import { Routes, RouterModule } from '@angular/router';
import { FillScoreComponent } from './fillscore.component';
import { CVComponent } from './cv.component';
// import { LoginComponent } from './login/login.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: FillScoreComponent,
    children: [
      { path: 'cv', component: CVComponent }
    ],
  },
];

export const routing = RouterModule.forChild(routes);
