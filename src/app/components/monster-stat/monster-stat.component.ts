import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-monster-stat',
  templateUrl: './monster-stat.component.html',
  styleUrls: ['./monster-stat.component.scss']
})
export class MonsterStatComponent {

  @Input()
  name!: string;
  @Input()
  value!: number;
  @Input()
  position!: number;

  constructor() { }

}
