import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EliteApiService } from '../services/elite-api.service';
import { GameData } from '../models/game';
import { switchMap, map } from 'rxjs/operators';
import { LocationData } from '../models/location';

declare var window: any;

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  tournamentId: string;
  gameId: number;
  game$: Observable<GameData>;
  location$: Observable<LocationData>;

  constructor(
    private route: ActivatedRoute,
    private apiService: EliteApiService
  ) {}

  ngOnInit() {
    this.tournamentId = this.route.snapshot.paramMap.get('tournamentId');
    this.gameId = +this.route.snapshot.paramMap.get('gameId');
    this.game$ = this.apiService.getGame(this.tournamentId, this.gameId);
    this.location$ = this.game$.pipe(
      switchMap((game) =>
        this.apiService
          .getTournamentLocations(this.tournamentId)
          .pipe(map((locations) => locations[game.locationId]))
      )
    );
  }

  getScoreColor(score1: string, score2: string) {
    return +score1 > +score2 ? 'success' : 'danger';
  }

  goToDirections(location: LocationData) {
    window.location = `geo:${location.latitude},${location.longitude};u=35`;
  }
}
