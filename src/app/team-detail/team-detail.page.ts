import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EliteApiService } from '../services/elite-api.service';
import { Observable } from 'rxjs';
import { filter, flatMap, toArray } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.page.html',
  styleUrls: ['./team-detail.page.scss'],
})
export class TeamDetailPage implements OnInit {
  team$: Observable<any>;
  teamStanding$: Observable<any>;
  gamesFilteredByDate$: ReturnType<EliteApiService['getGamesForTeam']>;
  filterDate: string; // = '2015-03-21';

  constructor(
    private route: ActivatedRoute,
    private apiService: EliteApiService
  ) {}

  ngOnInit() {
    const tournamentId = this.route.snapshot.paramMap.get('tournamentId');
    const teamId = +this.route.snapshot.paramMap.get('teamId');
    this.team$ = this.apiService.getTeam(tournamentId, teamId);
    this.teamStanding$ = this.apiService.getTeamStanding(tournamentId, teamId);

    const games$ = this.apiService.getGamesForTeam(tournamentId, teamId);
    this.gamesFilteredByDate$ = games$.pipe(
      flatMap((games) => games),
      filter(
        (game) =>
          !this.filterDate || moment(game.time).isSame(this.filterDate, 'day')
      ),
      toArray()
    );
  }
}
