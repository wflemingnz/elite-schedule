import { Component, OnInit } from '@angular/core';
import { TeamDetailPage } from '../team-detail/team-detail.page';
import { StandingsPage } from '../standings/standings.page';

@Component({
  selector: 'app-team-home',
  templateUrl: './team-home.page.html',
  styleUrls: ['./team-home.page.scss'],
})
export class TeamHomePage implements OnInit {
  public teamDetailTab = TeamDetailPage;
  public standingsTab = StandingsPage;

  constructor() {}

  ngOnInit() {}
}
