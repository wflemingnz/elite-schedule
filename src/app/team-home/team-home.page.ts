import { Component, OnInit } from '@angular/core';
import { TeamDetailPage } from '../team-detail/team-detail.page';
import { StandingsPage } from '../standings/standings.page';
import { ActivatedRoute } from '@angular/router';
import { EliteApiService } from '../services/elite-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-team-home',
  templateUrl: './team-home.page.html',
  styleUrls: ['./team-home.page.scss'],
})
export class TeamHomePage implements OnInit {
  team$: Observable<any>;
  public teamDetailTab = TeamDetailPage;
  public standingsTab = StandingsPage;

  constructor(
    private route: ActivatedRoute,
    private apiService: EliteApiService
  ) {}

  ngOnInit() {
    const tournamentId = this.route.snapshot.paramMap.get('tournamentId');
    const teamId = +this.route.snapshot.paramMap.get('teamId');
    this.team$ = this.apiService.getTeam(tournamentId, teamId);
  }
}
