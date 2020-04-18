import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, zip, of } from 'rxjs';
import { EliteApiService } from '../services/elite-api.service';
import { flatMap, groupBy, mergeMap, toArray, map } from 'rxjs/operators';
import { TeamStandingData } from '../models/team-standing';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.page.html',
  styleUrls: ['./standings.page.scss'],
})
export class StandingsPage implements OnInit {
  standings$: Observable<TeamStandingData[]>;
  standingsByDivision$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private apiService: EliteApiService
  ) {}

  ngOnInit() {
    const tournamentId = this.route.snapshot.paramMap.get('tournamentId');
    this.standings$ = this.apiService.getTournamentTeamStandings(tournamentId);
    this.standingsByDivision$ = this.standings$.pipe(
      flatMap((standings) => standings),
      groupBy((standing) => standing.division),
      mergeMap((group) => zip(of(group.key), group.pipe(toArray()))),
      map((groupsArray) => ({
        division: groupsArray[0],
        standings: groupsArray[1],
      })),
      toArray()
    );
  }
}
