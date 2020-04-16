import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { EliteApiService } from '../services/elite-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.page.html',
  styleUrls: ['./tournaments.page.scss'],
})
export class TournamentsPage {
  tournaments$ = this.apiService.getTournaments();

  constructor(private apiService: EliteApiService) {}
}
