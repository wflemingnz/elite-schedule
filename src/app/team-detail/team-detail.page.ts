import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EliteApiService } from '../services/elite-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.page.html',
  styleUrls: ['./team-detail.page.scss'],
})
export class TeamDetailPage implements OnInit {
  team$: Observable<any>;
  games$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private apiService: EliteApiService
  ) {}

  ngOnInit() {
    const tournamentId = this.route.snapshot.paramMap.get('tournamentId');
    const teamId = +this.route.snapshot.paramMap.get('teamId');
    this.team$ = this.apiService.getTeam(tournamentId, teamId);
    this.games$ = this.apiService.getGamesForTeam(tournamentId, teamId);
  }
}
