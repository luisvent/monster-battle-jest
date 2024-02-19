import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Monster} from 'src/app/interfaces/monster.interface';

@Component({
  selector: 'app-monster-battle-card',
  templateUrl: './monster-battle-card.component.html',
  styleUrls: ['./monster-battle-card.component.scss'],
})
export class MonsterBattleCardComponent implements OnChanges {

  @Input() public monster!: Monster | null;
  @Input() public title: string | null = null;

  stats: MonsterStat[] = [];

  statsToDisplay = [
    'hp',
    'attack',
    'defense',
    'speed'
  ];

  ngOnChanges(changes: SimpleChanges): void {
    this.stats = this.getMonsterStats();
  }


  getMonsterStats(): MonsterStat[] {
    if(this.monster) {

      const monsterStat = this.statsToDisplay.filter(stat => Object.keys(this.monster!).includes(stat));

      return monsterStat.map(mStat => {
        return {
          name: mStat,
          value: this.monster? this.monster[mStat as keyof Monster] as number : 0
        }
      });

    } else{
      return [];
    }
  }

}

interface MonsterStat {
  name: string;
  value: number;
}
