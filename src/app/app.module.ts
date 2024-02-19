import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonsterBattleCardComponent } from './components/monster-battle-card/monster-battle-card.component';
import { WinnerDisplayComponent } from './components/winner-display/winner-display.component';
import { MonsterCardComponent } from './components/monster-card/monster-card.component';
import { MonsterListComponent } from './components/monster-list/monster-list.component';
import { BattleOfMonstersComponent } from './views/battle-of-monsters/battle-of-monsters.component';
import { MonstersService } from './services/monsters.service';

import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MonsterStatComponent } from './components/monster-stat/monster-stat.component';

const MaterialModules = [
  MatCardModule,
  MatProgressBarModule,
  MatButtonModule,
  MatDividerModule,
];
@NgModule({
  declarations: [
    AppComponent,
    MonsterBattleCardComponent,
    WinnerDisplayComponent,
    MonsterCardComponent,
    MonsterListComponent,
    BattleOfMonstersComponent,
    MonsterStatComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    MaterialModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
