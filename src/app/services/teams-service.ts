import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private teams = [
    { id: 1, name: 'HC Elite' },
    { id: 2, name: 'Team Takeover' },
    { id: 3, name: 'DC Thunder' },
  ];

  getAll() {
    return this.teams;
  }

  getById(id: number) {
    return this.teams.find((t) => t.id === id);
  }
}
