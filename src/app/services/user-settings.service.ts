import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  constructor(private storage: Storage) {}

  async followTeam(teamId: number) {
    const item = { teamId };
    await this.storage.set(teamId.toString(), item);
  }

  async unfollowTeam(teamId: number) {
    await this.storage.remove(teamId.toString());
  }

  async isTeamFollowed(teamId: number) {
    const item = await this.storage.get(teamId.toString());
    return !!item;
  }
}
