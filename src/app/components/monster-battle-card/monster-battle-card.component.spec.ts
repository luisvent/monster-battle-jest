import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { mockMonsters } from '../../__mocks__/monsters';
import { MonsterBattleCardComponent } from './monster-battle-card.component';

describe('MonsterBattleCardComponent', () => {
  let component: MonsterBattleCardComponent;
  let fixture: ComponentFixture<MonsterBattleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonsterBattleCardComponent],
      imports: [CommonModule, MatCardModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MonsterBattleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show the default card', () => {
    component.monster = null;
    component.title = 'Player';
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.empty-card')).properties['innerHTML'].trim()
    ).toEqual('Player');
    expect(fixture.debugElement.query(By.css('img'))).toBeNull();
  });

  it('should show the card with image', () => {
    component.monster = mockMonsters.selectedMonster;
    component.title = mockMonsters.selectedMonster.name;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.mat-card-image'))
    ).toBeTruthy()
  });
});
