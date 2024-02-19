import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Monster } from '../interfaces/monster.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {BattleWinner} from "../interfaces/battle-winner.interface";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class MonstersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Monster[]> {
    return this.http.get<Monster[]>(`${environment.API_URL}/monsters`);
  }

  battle(monster1Id: string, monster2Id: string): Observable<BattleWinner> {
    return this.http.post<BattleWinner>(`${environment.API_URL}/battle`, {
      monster1Id,
      monster2Id,
    });
  }
}
