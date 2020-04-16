import { Component } from '@angular/core';
import { EliteApiService } from '../services/elite-api.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.page.html',
  styleUrls: ['./tournaments.page.scss'],
})
export class TournamentsPage {
  tournaments$ = this.apiService.getTournaments();

  constructor(private apiService: EliteApiService) {}
}
