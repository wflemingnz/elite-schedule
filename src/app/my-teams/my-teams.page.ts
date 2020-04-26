import { Component, OnInit } from '@angular/core';
import { Observable, from, forkJoin } from 'rxjs';
import { TeamData } from '../models/team';
import { EliteApiService } from '../services/elite-api.service';
import { switchMap, map } from 'rxjs/operators';
import { UserSettingsService } from '../services/user-settings.service';
import { TournamentData } from '../models/tournament';

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.page.html',
  styleUrls: ['./my-teams.page.scss'],
})
export class MyTeamsPage implements OnInit {
  followedTeams$: Observable<{ team: TeamData; tournament: TournamentData }[]>;

  constructor(
    private apiService: EliteApiService,
    private userSettings: UserSettingsService
  ) {}

  ngOnInit() {
    const teams$ = this.apiService.getTeams();
    const tournaments$ = this.apiService.getTournaments();
    this.followedTeams$ = forkJoin([teams$, tournaments$]).pipe(
      switchMap(([teams, tournaments]) =>
        from(this.userSettings.getFollowedTeams()).pipe(
          map((followedTeams) =>
            followedTeams.map((followedTeam) => ({
              team: teams.find((team) => team.id === followedTeam.teamId),
              tournament: tournaments.find(
                (tournament) => tournament.id === followedTeam.tournamentId
              ),
            }))
          )
        )
      )
    );
  }
}
