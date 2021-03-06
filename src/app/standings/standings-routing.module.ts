import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StandingsPage } from './standings.page';

const routes: Routes = [
  {
    path: '',
    component: StandingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StandingsPageRoutingModule {}
