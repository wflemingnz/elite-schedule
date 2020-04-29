import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameData } from '../models/game';
import { ActivatedRoute } from '@angular/router';
import { EliteApiService } from '../services/elite-api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  tournamentId: string;
  gameId: number;
  game$: Observable<GameData>;

  constructor(
    private route: ActivatedRoute,
    private apiService: EliteApiService
  ) {}

  ngOnInit() {
    this.tournamentId = this.route.snapshot.paramMap.get('tournamentId');
    this.gameId = +this.route.snapshot.paramMap.get('gameId');
    this.game$ = this.apiService.getGame(this.tournamentId, this.gameId);
  }
}
