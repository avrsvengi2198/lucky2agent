import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuypageComponent } from './buypage.component';

describe('BuypageComponent', () => {
  let component: BuypageComponent;
  let fixture: ComponentFixture<BuypageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuypageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
