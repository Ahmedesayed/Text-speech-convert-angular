import { TestBed } from '@angular/core/testing';

import { TextSpeechApiService } from './text-speech-api.service';

describe('TextSpeechApiService', () => {
  let service: TextSpeechApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextSpeechApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
