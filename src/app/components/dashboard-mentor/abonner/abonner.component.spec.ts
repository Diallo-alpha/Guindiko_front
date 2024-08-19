import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnerComponent } from './abonner.component';

describe('AbonnerComponent', () => {
  let component: AbonnerComponent;
  let fixture: ComponentFixture<AbonnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbonnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbonnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
