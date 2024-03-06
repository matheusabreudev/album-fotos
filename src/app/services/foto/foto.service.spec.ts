import { TestBed } from '@angular/core/testing';

import { FotoService } from './foto.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FotoService', () => {
  let service: FotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule ],
    });
    service = TestBed.inject(FotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
