import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage {
  imageUri: string;
  error = '';
  cameraOptions: CameraOptions = {
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.CAMERA,
    encodingType: this.camera.EncodingType.JPEG,
    saveToPhotoAlbum: false,
  };

  constructor(private camera: Camera) {}

  async takePhoto() {
    try {
      this.imageUri =
        'data:image/jpeg;base64,' +
        (await this.camera.getPicture(this.cameraOptions));
    } catch (error) {
      this.error = error;
    } finally {
      await this.camera.cleanup();
    }
  }
}
