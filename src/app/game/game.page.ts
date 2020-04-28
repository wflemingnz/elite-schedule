import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EliteApiService } from '../services/elite-api.service';
import { GameData } from '../models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  tournamentId: string;
  game$: Observable<GameData>;

  constructor(
    private route: ActivatedRoute,
    private apiService: EliteApiService
  ) {}

  ngOnInit() {
    this.tournamentId = this.route.snapshot.paramMap.get('tournamentId');
    const gameId = +this.route.snapshot.paramMap.get('gameId');
    this.game$ = this.apiService.getGame(this.tournamentId, gameId);
  }

  getScoreColor(score1: string, score2: string) {
    return +score1 > +score2 ? 'success' : 'danger';
  }

  goToMap() {}

  goToDirections() {}
}
