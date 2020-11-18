import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentcreateComponent } from './agentcreate.component';

describe('AgentcreateComponent', () => {
  let component: AgentcreateComponent;
  let fixture: ComponentFixture<AgentcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
