import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Foto } from 'src/app/model/foto';
import { FotoService } from 'src/app/services/foto/foto.service';

@Component({
  selector: 'app-foto-list',
  templateUrl: './foto-list.component.html',
  styleUrls: ['./foto-list.component.css']
})
export class FotoListComponent implements OnInit {
  
  constructor(private fotoService: FotoService, private route: ActivatedRoute) { }

  fotos: Foto[];

  ngOnInit(): void { 
    this.route.paramMap.subscribe(params => {
      const albumId = +params.get('albumId');
      this.buscarFotos(albumId);
    });
  }

  buscarFotos(albumId) {
    this.fotoService.getFotos(albumId).subscribe(fotos => {
      this.fotos = fotos;
    });
  }

}
