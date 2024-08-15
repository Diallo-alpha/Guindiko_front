import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteurComponent } from './menteur.component';

describe('MenteurComponent', () => {
  let component: MenteurComponent;
  let fixture: ComponentFixture<MenteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
