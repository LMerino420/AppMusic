import { TestBed } from '@angular/core/testing';

import { ServMusicService } from './serv-music.service';

describe('ServMusicService', () => {
  let service: ServMusicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServMusicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
