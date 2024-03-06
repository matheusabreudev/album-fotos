import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeAll, mergeMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private albumsUrl = 'https://jsonplaceholder.typicode.com/albums';
  private photosUrl = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient) { }

  getAlbumsWithPhotos(): Observable<any[]> {
    const albums$ = this.http.get<any[]>(this.albumsUrl);

    const firstPhotos$ = this.getFirstPhotos();

    return forkJoin([albums$, firstPhotos$]).pipe(
      map(([albums, firstPhotos]) => {
        const albumsWithThumbnails = albums.map((album, index) => {
          const thumbnailUrl = firstPhotos[index] ? firstPhotos[index].thumbnailUrl : null;
          return { ...album, thumbnailUrl };
        });
        return albumsWithThumbnails;
      })
    );
  }

  private getFirstPhotos(): Observable<any[]> {
    return this.http.get<any[]>(this.photosUrl).pipe(
      map(photos => {
        const firstPhotos = photos.reduce((acc, photo) => {
          if (!acc[photo.albumId]) {
            acc[photo.albumId] = photo;
          }
          return acc;
        }, {});
        return Object.values(firstPhotos);
      })
    );
  }

}
