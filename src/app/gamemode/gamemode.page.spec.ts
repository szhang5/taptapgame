import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamemodePage } from './gamemode.page';

describe('GamemodePage', () => {
  let component: GamemodePage;
  let fixture: ComponentFixture<GamemodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamemodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamemodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
