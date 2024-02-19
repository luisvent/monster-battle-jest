import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-winner-display',
  templateUrl: './winner-display.component.html',
  styleUrls: ['./winner-display.component.scss'],
})
export class WinnerDisplayComponent {
  @Input() public message: string | null = null;
}
