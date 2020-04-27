import { Component, OnInit } from '@angular/core';
import { EliteApiService } from '../services/elite-api.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, zip, of, BehaviorSubject } from 'rxjs';
import {
  groupBy,
  mergeMap,
  toArray,
  map,
  flatMap,
  switchMap,
  filter,
} from 'rxjs/operators';
import { TeamData } from '../models/team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  tournamentId: string;
  filteredTeamsByDivision$: Observable<any>;
  filterTextSubject = new BehaviorSubject<string>('');

  constructor(
    private route: ActivatedRoute,
    private apiService: EliteApiService
  ) {}

  ngOnInit() {
    this.tournamentId = this.route.snapshot.paramMap.get('tournamentId');

    const teams$ = this.apiService.getTournamentTeams(this.tournamentId);
    this.filteredTeamsByDivision$ = this.filterTextSubject.pipe(
      switchMap((filterText) =>
        teams$.pipe(
          flatMap((teams) => teams),
          filter((team) => this.showTeamBasedOnFilter(team, filterText)),
          groupBy((team) => team.division),
          mergeMap((group) => zip(of(group.key), group.pipe(toArray()))),
          map((groupsArray) => ({
            division: groupsArray[0],
            teams: groupsArray[1],
          })),
          toArray()
        )
      )
    );
  }

  filterTeams($event) {
    this.filterTextSubject.next($event.target.value);
  }

  showTeamBasedOnFilter(team: TeamData, filterText: string) {
    return (
      filterText.length === 0 ||
      team.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }
}
