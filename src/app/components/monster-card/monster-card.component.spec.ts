import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { mockMonsters } from '../../__mocks__/monsters';
import { MonsterCardComponent } from './monster-card.component';
import {HttpClientModule} from "@angular/common/http";
import {StateManagementService} from "../../services/state-management.service";
import {MonstersService} from "../../services/monsters.service";

describe('MonsterCardComponent', () => {
  let component: MonsterCardComponent;
  let fixture: ComponentFixture<MonsterCardComponent>;
  let stateService: StateManagementService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonsterCardComponent],
      imports: [CommonModule, MatCardModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MonsterCardComponent);
    stateService = TestBed.inject(StateManagementService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show the card with its attributes', () => {
    component.monster = mockMonsters.selectedMonster;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('p')).properties['innerHTML']
    ).toEqual('Dead Unicorn');
    expect(
      fixture.debugElement.query(By.css('img')).properties['src']
    ).toContain(mockMonsters.selectedMonster.imageUrl);
  });

  it('should select a monster', fakeAsync(() => {
    component.monster = mockMonsters.selectedMonster;
    component.handleMonsterClick(mockMonsters.selectedMonster);
    tick();
    expect(stateService.getSelectedMonster()).toEqual(mockMonsters.selectedMonster)
  }));

  it('should unselect a monster', fakeAsync(() => {
    component.monster = mockMonsters.selectedMonster;
    stateService.setSelectedMonster(mockMonsters.selectedMonster);
    tick();
    fixture.detectChanges();
    stateService.setSelectedMonster(mockMonsters.selectedMonster);
    fixture.detectChanges();

    expect(stateService.getSelectedMonsterId()).not.toEqual(mockMonsters.selectedMonsterId)
  }));
});
