import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamHomePage } from './team-home.page';

const routes: Routes = [
  {
    path: ':teamId',
    component: TeamHomePage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'team-detail',
      },
      {
        path: 'team-detail',
        loadChildren: () =>
          import('../team-detail/team-detail.module').then(
            (m) => m.TeamDetailPageModule
          ),
      },
      {
        path: 'standings',
        loadChildren: () =>
          import('../standings/standings.module').then(
            (m) => m.StandingsPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamHomePageRoutingModule {}
