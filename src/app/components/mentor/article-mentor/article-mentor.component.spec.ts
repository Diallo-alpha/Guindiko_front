import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleMentorComponent } from './article-mentor.component';

describe('ArticleMentorComponent', () => {
  let component: ArticleMentorComponent;
  let fixture: ComponentFixture<ArticleMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleMentorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
