import { Component, OnInit } from '@angular/core';
import { EliteApiService } from '../services/elite-api.service';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.page.html',
  styleUrls: ['./tournaments.page.scss'],
})
export class TournamentsPage implements OnInit {
  tournaments$: Observable<any>;

  constructor(
    private apiService: EliteApiService,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    const loader = await this.loadingController.create({
      message: 'Getting tournaments...',
    });

    await loader.present();
    this.tournaments$ = this.apiService
      .getTournaments()
      .pipe(finalize(() => loader.dismiss()));
  }
}
