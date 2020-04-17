import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EliteApiService } from '../services/elite-api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  tournamentId: string;
  game$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private apiService: EliteApiService
  ) {}

  ngOnInit() {
    this.tournamentId = this.route.snapshot.paramMap.get('tournamentId');
    const gameId = +this.route.snapshot.paramMap.get('gameId');
    this.game$ = this.apiService.getGame(this.tournamentId, gameId);
  }
}
