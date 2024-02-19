import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Monster } from 'src/app/interfaces/monster.interface';
import {Observable} from "rxjs";
import {StateManagementService} from "../../services/state-management.service";

@Component({
  selector: 'app-monster-list',
  templateUrl: './monster-list.component.html',
  styleUrls: ['./monster-list.component.scss'],
})
export class MonsterListComponent implements OnInit{

  monsters$!: Observable<Monster[]>;

  constructor(private stateService: StateManagementService) {
  }

  ngOnInit(): void {
    this.monsters$ = this.stateService.monsters$;
  }
}
