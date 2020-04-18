import { Component, OnInit } from '@angular/core';
import { EliteApiService } from '../services/elite-api.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, zip, of } from 'rxjs';
import { groupBy, mergeMap, toArray, map, flatMap } from 'rxjs/operators';
import { TeamData } from '../models/team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  tournamentId: string;
  teams$: Observable<TeamData[]>;
  teamsByDivision$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private apiService: EliteApiService
  ) {}

  ngOnInit() {
    this.tournamentId = this.route.snapshot.paramMap.get('tournamentId');
    this.teams$ = this.apiService.getTournamentTeams(this.tournamentId);
    this.teamsByDivision$ = this.teams$.pipe(
      flatMap((teams) => teams),
      groupBy((team) => team.division),
      mergeMap((group) => zip(of(group.key), group.pipe(toArray()))),
      map((groupsArray) => ({
        division: groupsArray[0],
        teams: groupsArray[1],
      })),
      toArray()
    );
  }
}
