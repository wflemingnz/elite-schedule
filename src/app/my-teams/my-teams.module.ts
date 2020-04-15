import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTeamsPageRoutingModule } from './my-teams-routing.module';

import { MyTeamsPage } from './my-teams.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyTeamsPageRoutingModule
  ],
  declarations: [MyTeamsPage]
})
export class MyTeamsPageModule {}
