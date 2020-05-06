import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-teams',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadChildren: () =>
      import('./folder/folder.module').then((m) => m.FolderPageModule),
  },
  {
    path: 'my-teams',
    loadChildren: () =>
      import('./my-teams/my-teams.module').then((m) => m.MyTeamsPageModule),
  },
  {
    path: 'tournaments',
    loadChildren: () =>
      import('./tournaments/tournaments.module').then(
        (m) => m.TournamentsPageModule
      ),
  },
  {
    path: 'teams/:tournamentId',
    loadChildren: () =>
      import('./teams/teams.module').then((m) => m.TeamsPageModule),
  },
  {
    path: 'tournaments/:tournamentId/game',
    loadChildren: () =>
      import('./game/game.module').then((m) => m.GamePageModule),
  },

  {
    path: 'tournaments/:tournamentId/team-home',
    loadChildren: () =>
      import('./team-home/team-home.module').then((m) => m.TeamHomePageModule),
  },
  {
    path: 'tournaments/:tournamentId/game/:gameId/map',
    loadChildren: () => import('./map/map.module').then((m) => m.MapPageModule),
  },  {
    path: 'vibration',
    loadChildren: () => import('./vibration/vibration.module').then( m => m.VibrationPageModule)
  },
  {
    path: 'geolocation',
    loadChildren: () => import('./geolocation/geolocation.module').then( m => m.GeolocationPageModule)
  },
  {
    path: 'camera',
    loadChildren: () => import('./camera/camera.module').then( m => m.CameraPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
