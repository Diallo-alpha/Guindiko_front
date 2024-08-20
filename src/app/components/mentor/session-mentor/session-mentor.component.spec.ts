import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionMentorComponent } from './session-mentor.component';

describe('SessionMentorComponent', () => {
  let component: SessionMentorComponent;
  let fixture: ComponentFixture<SessionMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionMentorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessionMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
