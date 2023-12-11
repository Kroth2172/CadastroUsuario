import { TestBed } from '@angular/core/testing';
import { UsuarioService } from './usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UsuarioService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [UsuarioService]
  }));

  it('should be created', () => {
    expect(UsuarioService).toBeTruthy();
  });
});
