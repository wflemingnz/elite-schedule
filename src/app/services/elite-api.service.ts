import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
    return this.http.get<any>(
      `${this.baseUrl}data/tournaments-data/${tournamentId}/teams.json`
    );
  }

  getTeam(tournamentId: string, teamId: number): Observable<any> {
    return this.getTournamentTeams(tournamentId).pipe(
      map((teams) => teams.find((team) => team.id === teamId))
    );
  }
}
