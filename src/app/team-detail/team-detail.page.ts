import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EliteApiService } from '../services/elite-api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.page.html',
  styleUrls: ['./team-detail.page.scss'],
})
export class TeamDetailPage implements OnInit {
  team$: Observable<any>;
  teamStanding$: Observable<any>;
  gamesFiltered$: ReturnType<EliteApiService['getGamesForTeam']>;
  filterDateSubject = new BehaviorSubject<string>(null);
  useDateFilterSubject = new BehaviorSubject<boolean>(false);

  public get filterDate(): string {
    return this.filterDateSubject.value;
  }
  public set filterDate(value: string) {
    this.filterDateSubject.next(value);
  }

  public get useDateFilter(): boolean {
    return this.useDateFilterSubject.value;
  }
  public set useDateFilter(value: boolean) {
    this.useDateFilterSubject.next(value);
  }

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

    this.gamesFiltered$ = games$.pipe(
      switchMap((games) =>
        this.useDateFilterSubject.pipe(
          switchMap((useDateFilter) =>
            this.filterDateSubject.pipe(
              map((filterDate) =>
                !useDateFilter || !filterDate
                  ? games
                  : games.filter((game) =>
                      moment(game.time).isSame(filterDate, 'day')
                    )
              )
            )
          )
        )
      )
    );
  }
}
