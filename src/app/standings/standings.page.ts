import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { EliteApiService } from '../services/elite-api.service';
import { map, flatMap, filter, toArray, switchMap } from 'rxjs/operators';
import { TeamStandingData } from '../models/team-standing';
import * as _ from 'lodash';
import { TeamData } from '../models/team';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.page.html',
  styleUrls: ['./standings.page.scss'],
})
export class StandingsPage implements OnInit {
  standings$: Observable<TeamStandingData[]>;
  standingsOrderedByDivision$: Observable<TeamStandingData[]>;
  filterStandingsSubject = new BehaviorSubject<string>('');

  constructor(
    private route: ActivatedRoute,
    private apiService: EliteApiService
  ) {}

  ngOnInit() {
    const tournamentId = this.route.snapshot.paramMap.get('tournamentId');
    const teamId = +this.route.snapshot.paramMap.get('teamId');
    const team$ = this.apiService.getTeam(tournamentId, teamId);
    this.standings$ = this.apiService.getTournamentTeamStandings(tournamentId);
    this.standingsOrderedByDivision$ = this.filterStandingsSubject.pipe(
      switchMap((filterMode) =>
        team$.pipe(
          switchMap((team) =>
            this.standings$.pipe(
              flatMap((standings) => standings),
              filter((standing) =>
                this.showStandingBasedOnFilter(standing, filterMode, team)
              ),
              toArray(),
              map((standings) =>
                _.sortBy(standings, (s: TeamStandingData) => s.division)
              )
            )
          )
        )
      )
    );
  }

  getHeader(
    standing: TeamStandingData,
    index: number,
    standings: TeamStandingData[]
  ) {
    if (index === 0 || standing.division !== standings[index - 1].division) {
      return standing.division;
    } else {
      return null;
    }
  }

  filterStandings($event) {
    this.filterStandingsSubject.next($event.target.value);
  }

  showStandingBasedOnFilter(
    standing: TeamStandingData,
    filterMode: string,
    team: TeamData
  ) {
    return filterMode === 'all' || standing.division === team.division;
  }
}
