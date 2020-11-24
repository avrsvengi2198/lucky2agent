import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentwinnerComponent } from './agentwinner.component';

describe('AgentwinnerComponent', () => {
  let component: AgentwinnerComponent;
  let fixture: ComponentFixture<AgentwinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentwinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentwinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
