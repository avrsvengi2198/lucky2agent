import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryWinnerComponent } from './lottery-winner.component';

describe('LotteryWinnerComponent', () => {
  let component: LotteryWinnerComponent;
  let fixture: ComponentFixture<LotteryWinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotteryWinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryWinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
