import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EliteApiService } from '../services/elite-api.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap, startWith } from 'rxjs/operators';
import * as moment from 'moment';
import { Game } from '../models/game';
import { AlertController, ToastController } from '@ionic/angular';
import { UserSettingsService } from '../services/user-settings.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.page.html',
  styleUrls: ['./team-detail.page.scss'],
})
export class TeamDetailPage implements OnInit {
  tournamentId: string;
  teamId: number;
  team$: Observable<any>;
  teamIsFollowed$: Observable<boolean>;
  teamStanding$: Observable<any>;
  gamesFiltered$: Observable<Game[]>;
  filterDateSubject = new BehaviorSubject<string>(null);
  useDateFilterSubject = new BehaviorSubject<boolean>(false);
  teamIsFollowedSubject = new BehaviorSubject<boolean>(null);

  public get filterDate(): string {
    return this.filterDateSubject.value;
  }
  public set filterDate(value: string) {
    this.filterDateSubject.next(value);
  }

  public get useDateFilter(): boolean {
    return this.useDateFilterSubject.value;
  }
  public set useDateFilter(value: boolean) {
    this.useDateFilterSubject.next(value);
  }

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private apiService: EliteApiService,
    private userSettings: UserSettingsService
  ) {}

  ngOnInit() {
    this.tournamentId = this.route.snapshot.paramMap.get('tournamentId');
    this.teamId = +this.route.snapshot.paramMap.get('teamId');
    this.team$ = this.apiService.getTeam(this.tournamentId, this.teamId);
    this.teamIsFollowed$ = combineLatest([
      this.userSettings.isTeamFollowed(this.teamId),
      this.teamIsFollowedSubject,
    ]).pipe(
      map(([userSettingValue, subjectValue]) =>
        subjectValue != null ? subjectValue : userSettingValue
      )
    );

    this.teamStanding$ = this.apiService.getTeamStanding(
      this.tournamentId,
      this.teamId
    );

    const games$ = this.apiService.getGamesForTeam(
      this.tournamentId,
      this.teamId
    );

    this.gamesFiltered$ = games$.pipe(
      switchMap((games) =>
        this.useDateFilterSubject.pipe(
          switchMap((useDateFilter) =>
            this.filterDateSubject.pipe(
              map((filterDate) =>
                this.filterGames(games, useDateFilter, filterDate)
              )
            )
          )
        )
      )
    );
  }

  private filterGames(
    games: Game[],
    useDateFilter: boolean,
    filterDate: string
  ) {
    return !useDateFilter || !filterDate
      ? games
      : this.filterGamesByDate(games, filterDate);
  }

  private filterGamesByDate(games: Game[], filterDate: string) {
    return games.filter((game) => moment(game.time).isSame(filterDate, 'day'));
  }

  getResultColor(resultIndicator: string) {
    return resultIndicator === 'W' ? 'success' : 'danger';
  }

  async unfollowTeam() {
    const confirmAlert = await this.alertController.create({
      header: 'Unfollow?',
      message: 'Are you sure you want to unfollow?',
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            this.teamIsFollowedSubject.next(false);
            await this.userSettings.unfollowTeam(this.teamId);
            this.displayUnfollowedToast();
          },
        },
        {
          text: 'No',
        },
      ],
    });
    await confirmAlert.present();
  }

  async followTeam() {
    this.teamIsFollowedSubject.next(true);
    await this.userSettings.followTeam(this.teamId, this.tournamentId);
  }

  async displayUnfollowedToast() {
    const toast = await this.toastController.create({
      message: 'You have unfollowed this team',
      duration: 2000,
      position: 'top',
    });

    toast.present();
  }

  refresh(event) {
    // TODO
  }
}
