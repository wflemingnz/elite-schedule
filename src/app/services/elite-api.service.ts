import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EliteApiService {
  private baseUrl = 'https://elite-schedule-app-4e079.firebaseio.com/';

  constructor(private http: HttpClient) {}
}
