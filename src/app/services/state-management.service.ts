import { Injectable } from '@angular/core';
import {Monster, MonsterState} from "../interfaces/monster.interface";
import {Subject} from "rxjs";
import {MonstersService} from "./monsters.service";

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {

  selectedMonster$: Subject<Monster | undefined> = new Subject<Monster | undefined>();
  selectedMonsterId$: Subject<string | undefined> = new Subject<string | undefined>();
  monsters$: Subject<Monster[]> = new Subject<Monster[]>();
  isReset$: Subject<boolean> = new Subject<boolean>();

  private state: MonsterState = {
    monsters: [],
    selectedMonsterId: undefined,
    selectedMonster: undefined,
    isResetGame: true
  }

  constructor(private monsterService: MonstersService) { }


  init() {
    this.monsterService.getAll().subscribe((monsters) => {
      this.setMonsters(monsters);
    });
  }

  setSelectedMonster(monster: Monster | null) {

    if(monster?.id === this.state.selectedMonsterId) {
      this.setSelectedMonster(null);
      return;
    }

    this.state.selectedMonster = monster || undefined;
    this.state.selectedMonsterId = this.state.selectedMonster?.id;
    this.selectedMonster$.next(this.state.selectedMonster);
    this.selectedMonsterId$.next(this.state.selectedMonsterId);
  }

  setMonsters(monsters: Monster[]) {
    this.state.monsters = monsters;
    this.monsters$.next(this.state.monsters);
  }

  getMonsters() {
    return this.state.monsters;
  }

  getSelectedMonster() {
    return this.state.selectedMonster;
  }

  getSelectedMonsterId() {
    return this.state.selectedMonsterId;
  }

 }
