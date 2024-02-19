import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WinnerDisplayComponent } from './winner-display.component';

describe('WinnerDisplayComponent', () => {
  let component: WinnerDisplayComponent;
  let fixture: ComponentFixture<WinnerDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WinnerDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WinnerDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show message', () => {
    component.message = 'Angry Snake';
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('span')).properties['innerHTML']
    ).toEqual('Angry Snake wins!');
  });
});
