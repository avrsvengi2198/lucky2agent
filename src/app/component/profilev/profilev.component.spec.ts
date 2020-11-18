import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilevComponent } from './profilev.component';

describe('ProfilevComponent', () => {
  let component: ProfilevComponent;
  let fixture: ComponentFixture<ProfilevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
