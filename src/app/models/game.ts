export interface GameData {
  id: number;
  location: string;
  locationId: string;
  team1: string;
  team1Id: number;
  team2: string;
  team2Id: number;
  team1Score: string;
  team2Score: string;
  time: string;
}

export interface Game {
  id: number;
  opponent: string;
  time: number;
  location: string;
  locationUrl: string;
  resultIndicator: string;
  scores: string;
  homeAway: string;
}
