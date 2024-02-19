import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { mockMonsters } from '../../__mocks__/monsters';
import { MonsterCardComponent } from '../monster-card/monster-card.component';

import { MonsterListComponent } from './monster-list.component';
import {StateManagementService} from "../../services/state-management.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";

describe('MonsterListComponent', () => {
  let component: MonsterListComponent;
  let fixture: ComponentFixture<MonsterListComponent>;
  let stateService: StateManagementService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonsterListComponent, MonsterCardComponent],
      imports: [HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MonsterListComponent);
    stateService = TestBed.inject(StateManagementService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show the message when it have not monsters', () => {
    stateService.setMonsters([]);
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('span')).properties['innerHTML'].trim()
    ).toEqual('No monsters available');
  });

  it('should show the list of monsters', fakeAsync(() => {
    stateService.setMonsters(mockMonsters.monsters)
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('span')).properties['innerHTML'].trim()
    ).toEqual('Select your monster');
    const matCard = fixture.debugElement.queryAll(By.css('app-monster-card'));
    fixture.detectChanges();
    tick(400);
    expect(matCard.length).toEqual(5);
  }));

});
