import { Component, OnInit } from '@angular/core';
import { TeamDetailPage } from '../team-detail/team-detail.page';
import { StandingsPage } from '../standings/standings.page';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from '../services/teams-service';

@Component({
  selector: 'app-team-home',
  templateUrl: './team-home.page.html',
  styleUrls: ['./team-home.page.scss'],
})
export class TeamHomePage implements OnInit {
  team = {};
  public teamDetailTab = TeamDetailPage;
  public standingsTab = StandingsPage;

  constructor(
    private route: ActivatedRoute,
    private teamsService: TeamsService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.team = this.teamsService.getById(id);
  }
}
