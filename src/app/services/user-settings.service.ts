import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FollowedTeam } from '../models/followed-team';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  constructor(private storage: Storage) {}

  async followTeam(teamId: number, tournamentId: string) {
    const item: FollowedTeam = { tournamentId, teamId };
    await this.storage.set(teamId.toString(), JSON.stringify(item));
  }

  async unfollowTeam(teamId: number) {
    await this.storage.remove(teamId.toString());
  }

  async isTeamFollowed(teamId: number) {
    const item = await this.storage.get(teamId.toString());
    return !!item;
  }

  async getFollowedTeams(): Promise<FollowedTeam[]> {
    const teams: FollowedTeam[] = [];
    await this.storage.forEach((team) => teams.push(JSON.parse(team)));
    return teams;
  }
}
