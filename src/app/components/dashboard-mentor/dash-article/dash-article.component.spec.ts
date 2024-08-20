import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashArticleComponent } from './dash-article.component';

describe('DashArticleComponent', () => {
  let component: DashArticleComponent;
  let fixture: ComponentFixture<DashArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashArticleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
