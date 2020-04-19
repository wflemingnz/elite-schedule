import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter, flatMap, toArray } from 'rxjs/operators';
import { GameData, Game } from '../models/game';
import { TeamData } from '../models/team';
import { TeamStandingData } from '../models/team-standing';

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

  getTournamentTeamStandings(tournamentId: string) {
    return this.http.get<TeamStandingData[]>(
      `${this.baseUrl}data/tournaments-data/${tournamentId}/standings.json`
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

  getTeamStanding(tournamentId: string, teamId: number) {
    return this.getTournamentTeamStandings(tournamentId).pipe(
      map((standings) =>
        standings.find((standing) => standing.teamId === teamId)
      )
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

  createGame(game: any, teamId: number): Game {
    const isTeam1 = game.team1Id === teamId;
    const opponentName = isTeam1 ? game.team2 : game.team1;
    const { resultIndicator, scores } = this.getResultInfo(
      isTeam1,
      game.team1Score,
      game.team2Score
    );
    return {
      id: game.id,
      opponent: opponentName,
      time: Date.parse(game.time),
      location: game.location,
      locationUrl: game.locationUrl,
      resultIndicator,
      scores,
      homeAway: isTeam1 ? 'vs' : 'at',
    };
  }

  private getResultInfo(
    isTeam1: boolean,
    team1Score: number,
    team2Score: number
  ) {
    let resultIndicator = '';
    let scores = '';

    if (team1Score && team2Score) {
      const teamScore = isTeam1 ? team1Score : team2Score;
      const opponentScore = isTeam1 ? team2Score : team1Score;
      resultIndicator = teamScore > opponentScore ? 'W' : 'L';
      scores = `${teamScore}-${opponentScore}`;
    }

    return { resultIndicator, scores };
  }
}
