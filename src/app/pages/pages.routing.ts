import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'people', loadChildren: './people/people.module#PeopleModule' },
      { path: 'interview', loadChildren: './interview/interview.module#InterviewModule' },
      { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
