import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VibrationPageRoutingModule } from './vibration-routing.module';

import { VibrationPage } from './vibration.page';
import { Vibration } from '@ionic-native/vibration/ngx';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, VibrationPageRoutingModule],
  declarations: [VibrationPage],
  providers: [Vibration],
})
export class VibrationPageModule {}
