import { TestBed } from '@angular/core/testing';

import { AlbumService } from './album.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AlbumService', () => {
  let service: AlbumService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule ],
      providers: [AlbumService]
    });
    service = TestBed.inject(AlbumService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return albums with thumbnails', () => {
    const albumsResponse = [
      { id: 1, title: 'Album 1' },
      { id: 2, title: 'Album 2' }
    ];
    const photosResponse = [
      { albumId: 1, thumbnailUrl: 'thumbnail1.jpg' },
      { albumId: 2, thumbnailUrl: 'thumbnail2.jpg' }
    ];
    const expectedAlbumsWithThumbnails = [
      { id: 1, title: 'Album 1', thumbnailUrl: 'thumbnail1.jpg' },
      { id: 2, title: 'Album 2', thumbnailUrl: 'thumbnail2.jpg' }
    ];

    service.getAlbumsWithPhotos().subscribe(albumsWithThumbnails => {
      expect(albumsWithThumbnails).toEqual(expectedAlbumsWithThumbnails);
    });

    const albumsRequest = httpMock.expectOne(service['albumsUrl']);
    albumsRequest.flush(albumsResponse);

    const photosRequest = httpMock.expectOne(service['photosUrl']);
    photosRequest.flush(photosResponse);
  });
});
