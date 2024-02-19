import {Component, OnDestroy, OnInit} from '@angular/core';
import { Monster } from '../../interfaces/monster.interface';
import { MonstersService } from '../../services/monsters.service';
import {StateManagementService} from "../../services/state-management.service";
import {Subscription} from "rxjs";
import {BattleWinner} from "../../interfaces/battle-winner.interface";

@Component({
  selector: 'app-battle-of-monsters',
  templateUrl: './battle-of-monsters.component.html',
  styleUrls: ['./battle-of-monsters.component.scss'],
})
export class BattleOfMonstersComponent implements OnInit, OnDestroy {
  public player!: Monster | null;
  public computer!: Monster | null;
  subscription = new Subscription();
  battleWinner!: BattleWinner | null;

  constructor(private monsterService: MonstersService, private stateService: StateManagementService) {}

  ngOnInit(): void {
    this.stateService.init();
    this.subscription.add(this.stateService.selectedMonster$.subscribe(selectedMonster => {
      this.monsterSelected(selectedMonster || null);
    }));
  }

  startBattle() {
    if(this.areMonstersSelected()) {
      this.monsterService.battle(this.player!.id, this.computer!.id).subscribe(winner => {
        this.battleWinner = winner;
      });
    }
  }

  areMonstersSelected() {
    return this.player && this.computer;
  }

  monsterSelected(monster: Monster | null) {
    this.player = monster;
    this.battleWinner = null;
    this.setComputerRandomMonster();
  }

  setComputerRandomMonster() {
    if(this.player === null) {
      this.computer = null;
    } else {
      this.selectComputerMonster();
    }
  }

  selectComputerMonster() {
    const availableMonsterForComputer = this.stateService.getMonsters().filter(m => m.id !== this.player?.id);
    const computerMonster = availableMonsterForComputer[Math.floor(Math.random() * availableMonsterForComputer.length)];
    this.computer = computerMonster;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
