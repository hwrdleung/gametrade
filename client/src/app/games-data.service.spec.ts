import { TestBed, inject } from '@angular/core/testing';

import { GamesDataService } from './games-data.service';

describe('GamesDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GamesDataService]
    });
  });

  it('should be created', inject([GamesDataService], (service: GamesDataService) => {
    expect(service).toBeTruthy();
  }));
});
