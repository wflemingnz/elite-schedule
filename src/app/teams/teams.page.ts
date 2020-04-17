import { Component, OnInit } from '@angular/core';
import { EliteApiService } from '../services/elite-api.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  tournamentId: string;
  teams$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private apiService: EliteApiService
  ) {}

  ngOnInit() {
    this.tournamentId = this.route.snapshot.paramMap.get('tournamentId');
    this.teams$ = this.apiService.getTournamentTeams(this.tournamentId);
  }
}
