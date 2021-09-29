import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSpeechFormComponent } from './text-speech-form.component';

describe('TextSpeechFormComponent', () => {
  let component: TextSpeechFormComponent;
  let fixture: ComponentFixture<TextSpeechFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextSpeechFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSpeechFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
