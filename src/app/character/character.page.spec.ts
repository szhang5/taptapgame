import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterPage } from './character.page';

describe('CharacterPage', () => {
  let component: CharacterPage;
  let fixture: ComponentFixture<CharacterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
