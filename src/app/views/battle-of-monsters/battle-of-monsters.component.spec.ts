import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MonsterBattleCardComponent } from '../../components/monster-battle-card/monster-battle-card.component';
import { MonsterListComponent } from '../../components/monster-list/monster-list.component';
import { WinnerDisplayComponent } from '../../components/winner-display/winner-display.component';
import { Monster } from '../../interfaces/monster.interface';
import { MonstersService } from '../../services/monsters.service';
import { mockMonsters } from '../../__mocks__/monsters';
import { BattleOfMonstersComponent } from './battle-of-monsters.component';
import { By } from '@angular/platform-browser';
import {BattleWinner} from "../../interfaces/battle-winner.interface";
import {StateManagementService} from "../../services/state-management.service";

describe('BattleOfMonstersComponent', () => {
  let component: BattleOfMonstersComponent;
  let fixture: ComponentFixture<BattleOfMonstersComponent>;
  let monsterService: MonstersService;
  let stateService: StateManagementService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        BattleOfMonstersComponent,
        MonsterListComponent,
        WinnerDisplayComponent,
        MonsterBattleCardComponent,
      ],
      providers: [MonstersService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleOfMonstersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    monsterService = TestBed.inject(MonstersService);
    stateService = TestBed.inject(StateManagementService);

    const response: Monster[] = mockMonsters.monsters;
    const battleWinneResponse: BattleWinner = mockMonsters.battleWinner;
    jest.spyOn(monsterService, 'getAll').mockReturnValue(of(response));
    jest.spyOn(monsterService, 'battle').mockReturnValue(of(battleWinneResponse));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should get all list monsters', fakeAsync(() => {
  //   component.ngOnInit();
  //   tick();
  //   expect(component.monsters.length).toBe(5);
  // }));

  it('should show the main page', () => {
    expect(
      fixture.debugElement.query(By.css('span')).properties['innerHTML']
    ).toEqual('Battle of Monsters');
  });

  it('should select a monster', fakeAsync(() => {
    component.monsterSelected(mockMonsters.selectedMonster);
    fixture.detectChanges();
    tick();
    const buttonStartBattle = fixture.nativeElement.querySelector('button');
    expect(buttonStartBattle.disabled).toBeFalsy();
  }));

  it('should unselect a monster', () => {
    component.monsterSelected(null);
    const buttonStartBattle = fixture.nativeElement.querySelector('button');
    expect(buttonStartBattle.disabled).toBeTruthy();
  });

  it('should battle', fakeAsync(() => {
    component.player = mockMonsters.selectedMonster;
    component.computer = mockMonsters.monsters[3];
    component.battleWinner = null;

    component.startBattle();
    tick();

    expect(component.battleWinner).not.toBeNull();
  }));

  it('should not battle', fakeAsync(() => {
    component.player = mockMonsters.selectedMonster;
    component.computer = null;
    component.battleWinner = null;

    component.startBattle();
    tick();

    expect(component.battleWinner).toBeNull();
  }));

  it('should set selected monster', fakeAsync(() => {
    component.player = null;
    component.computer = null;
    component.ngOnInit();
    tick();
    stateService.setSelectedMonster(mockMonsters.selectedMonster);

    expect(component.player).not.toBeNull();
  }));

  it('should unset selected monster', fakeAsync(() => {
    component.player = null;
    component.computer = null;
    component.ngOnInit();
    tick();
    stateService.setSelectedMonster(mockMonsters.selectedMonster);
    fixture.detectChanges();
    stateService.setSelectedMonster(mockMonsters.selectedMonster);
    tick();
    fixture.detectChanges();

    expect(component.player).toBeNull();
  }));
});
