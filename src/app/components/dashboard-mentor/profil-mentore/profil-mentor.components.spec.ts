import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilMentorComponents } from './profil-mentor.components';

describe('ProfilMentorComponent', () => {
  let component: ProfilMentorComponents;
  let fixture: ComponentFixture<ProfilMentorComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilMentorComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilMentorComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
