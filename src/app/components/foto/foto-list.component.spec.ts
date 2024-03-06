import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoListComponent } from './foto-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { FotoService } from 'src/app/services/foto/foto.service';
import { Foto } from 'src/app/model/foto';

describe('FotoListComponent', () => {
  let component: FotoListComponent;
  let fixture: ComponentFixture<FotoListComponent>;
  let fotoServiceSpy: jasmine.SpyObj<FotoService>;

  beforeEach(async () => {
    fotoServiceSpy = jasmine.createSpyObj('FotoService', ['getFotos']);
    await TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule ],
      declarations: [ FotoListComponent ],
      providers: [
        { provide: FotoService, useValue: fotoServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ albumId: '1' }))
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch fotos when initialized', () => {
    const fotos: Foto[] = [{ id: 1, albumId: 1, title: 'Foto 1', url: 'http://example.com/photo.jpg', thumbnailUrl: 'http://example.com/thumbnail.jpg' }];
    fotoServiceSpy.getFotos.and.returnValue(of(fotos));

    component.ngOnInit();

    expect(component.fotos).toEqual(fotos);
  });
});
