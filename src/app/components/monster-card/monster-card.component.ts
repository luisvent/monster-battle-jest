import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Monster } from 'src/app/interfaces/monster.interface';
import {Observable} from "rxjs";
import {StateManagementService} from "../../services/state-management.service";

@Component({
  selector: 'app-monster-card',
  templateUrl: './monster-card.component.html',
  styleUrls: ['./monster-card.component.scss'],
})
export class MonsterCardComponent implements OnInit{

  @Input() public monster!: Monster | null;

  monsterSelectedId$!: Observable<string | undefined>;

constructor(private stateService: StateManagementService) {
}
  ngOnInit(): void {
   this.monsterSelectedId$ = this.stateService.selectedMonsterId$;
  }

  handleMonsterClick(monster: Monster | null) {
    this.monsterSelected(monster);
  }

  monsterSelected(monster: Monster | null) {
    this.stateService.setSelectedMonster(monster);
  }
}
