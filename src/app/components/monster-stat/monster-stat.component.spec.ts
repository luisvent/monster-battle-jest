import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterStatComponent } from './monster-stat.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";

describe('MonsterStatComponent', () => {
  let component: MonsterStatComponent;
  let fixture: ComponentFixture<MonsterStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonsterStatComponent ],
      imports: [MatProgressBarModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonsterStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
