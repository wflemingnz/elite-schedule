import { Component } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-vibration',
  templateUrl: './vibration.page.html',
  styleUrls: ['./vibration.page.scss'],
})
export class VibrationPage {
  constructor(private vibration: Vibration) {}

  vibrate() {
    this.vibration.vibrate(1000);
  }

  patternVibrate() {
    this.vibration.vibrate([1000, 500, 500]);
  }
}
