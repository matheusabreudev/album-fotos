import { TestBed } from '@angular/core/testing';

import { FotoService } from './foto.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Foto } from 'src/app/model/foto';

describe('FotoService', () => {
  let service: FotoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule ],
      providers: [FotoService]
    });
    service = TestBed.inject(FotoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected Fotos', () => {
    const mockFotos: Foto[] = [
      { id: 1, albumId: 1, title: 'Photo 1', url: 'http://example.com/photo1.jpg', thumbnailUrl: 'http://example.com/thumbnail1.jpg' },
      { id: 2, albumId: 1, title: 'Photo 2', url: 'http://example.com/photo2.jpg', thumbnailUrl: 'http://example.com/thumbnail2.jpg' }
    ];
    const idAlbum = 1;
    service.getFotos(idAlbum).subscribe(fotos => {
      expect(fotos).toBeTruthy();
      expect(fotos.length).toBe(2);
      expect(fotos).toEqual(mockFotos);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}?albumId=${idAlbum}&_limit=10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFotos);
  });
});
