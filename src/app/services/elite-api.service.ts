import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter, flatMap, toArray } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GameData } from '../models/game';
import { TeamData } from '../models/team';

@Injectable({
  providedIn: 'root',
})
export class EliteApiService {
  private baseUrl = 'https://elite-schedule-app-4e079.firebaseio.com/';

  constructor(private http: HttpClient) {}

  getTournaments() {
    return this.http.get(`${this.baseUrl}data/tournaments.json`);
  }

  getTournamentTeams(tournamentId: string) {
    return this.http.get<TeamData[]>(
      `${this.baseUrl}data/tournaments-data/${tournamentId}/teams.json`
    );
  }

  getTournamentGames(tournamentId: string) {
    return this.http.get<GameData[]>(
      `${this.baseUrl}data/tournaments-data/${tournamentId}/games.json`
    );
  }

  getTeam(tournamentId: string, teamId: number) {
    return this.getTournamentTeams(tournamentId).pipe(
      map((teams) => teams.find((team) => team.id === teamId))
    );
  }

  getGame(tournamentId: string, gameId: number) {
    return this.getTournamentGames(tournamentId).pipe(
      map((games) => games.find((game) => game.id === gameId))
    );
  }

  getGamesForTeam(tournamentId: string, teamId: number) {
    return this.getTournamentGames(tournamentId).pipe(
      flatMap((games) => games),
      filter((game) => game.team1Id === teamId || game.team2Id === teamId),
      map((game) => this.createGame(game, teamId)),
      toArray()
    );
  }

  createGame(game: any, teamId: number) {
    const isTeam1 = game.team1Id === teamId;
    const opponentName = isTeam1 ? game.team2 : game.team1;
    const scoreDisplay = this.getScoreDisplay(
      isTeam1,
      game.Team1Score,
      game.Team2Score
    );
    return {
      id: game.id,
      opponent: opponentName,
      time: Date.parse(game.time),
      location: game.location,
      locationUrl: game.locationUrl,
      scoreDisplay,
      homeAway: isTeam1 ? 'vs' : 'at',
    };
  }

  private getScoreDisplay(
    isTeam1: boolean,
    team1Score: number,
    team2Score: number
  ) {
    if (team1Score && team2Score) {
      const teamScore = isTeam1 ? team1Score : team2Score;
      const opponentScore = isTeam1 ? team2Score : team1Score;
      const winIndicator = teamScore > opponentScore ? 'W: ' : 'L: ';
      return `${winIndicator} ${teamScore} - ${opponentScore}`;
    }
  }
}
