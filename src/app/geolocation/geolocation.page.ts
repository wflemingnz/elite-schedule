import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage {
  latitude: number;
  longitude: number;

  constructor(private geolocation: Geolocation) {}

  async getLocation() {
    const currenPosition = await this.geolocation.getCurrentPosition();
    [this.latitude, this.longitude] = [
      currenPosition.coords.latitude,
      currenPosition.coords.longitude,
    ];
  }
}
