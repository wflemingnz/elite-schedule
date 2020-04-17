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
  tournamentId: string;

  constructor(
    private route: ActivatedRoute,
    private apiService: EliteApiService
  ) {}

  ngOnInit() {
    this.tournamentId = this.route.snapshot.paramMap.get('tournamentId');
    const teamId = +this.route.snapshot.paramMap.get('teamId');
    this.team$ = this.apiService.getTeam(this.tournamentId, teamId);
    this.games$ = this.apiService.getGamesForTeam(this.tournamentId, teamId);

    this.games$.subscribe(console.log);
  }
}
