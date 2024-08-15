import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnerMentorComponent } from './abonner-mentor.component';

describe('AbonnerMentorComponent', () => {
  let component: AbonnerMentorComponent;
  let fixture: ComponentFixture<AbonnerMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbonnerMentorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbonnerMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
