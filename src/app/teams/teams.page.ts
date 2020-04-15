import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../services/teams-service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  teams: any[];

  constructor(private teamsService: TeamsService) {}

  ngOnInit() {
    this.teams = this.teamsService.getAll();
  }
}
