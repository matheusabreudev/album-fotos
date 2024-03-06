import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/model/album';
import { AlbumService } from 'src/app/services/album/album.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  albums: Album[] = [];

  constructor(private albumService: AlbumService, private router: Router) { }

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums() {
    this.albumService.getAlbumsWithPhotos().subscribe(albums => {
      this.albums = albums;
    });
  }

  showPhotoList(albumId: number) {
    this.router.navigate(['/foto-list', albumId]);
  }

}
