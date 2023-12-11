import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from './services/usuario.service';
import { Usuario } from './model/usuario.model';
import { UtilsForm } from './utils/utils-form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  usuarios: Usuario[] = [];
  formUsuario: FormGroup;
  title = 'Desafio - First Decision';

  constructor(
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.formUsuario = this.formBuilder.group({});
  }

  ngOnInit() {
    this.configurarForm();
  }

  private configurarForm() {
    this.formUsuario = this.formBuilder.group({
      nome: [null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      email: [null, [
        Validators.required,
        Validators.email
      ]],
      senha: [null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)]
      ],
      senhaConfirmar: [null, [UtilsForm.equalsTo('senha')]],
    });
  }

  @ViewChild('inputNome')
  inputNome: ElementRef<HTMLInputElement> | null = null;

  salvarSucesso() {
    this.reiniciarFormulario();
    this.snackBar.open('Usuário salvo com sucesso!', '', { duration: 5000 });
  }

  salvarErro() {
    this.snackBar.open('Erro ao salvar o usuário, por favor, contate o administrador do sistema ou tente novamente.', '', { duration: 5000 })
  }

  salvar() {
    // Salvar no banco
    this.usuarioService.salvar(JSON.parse(JSON.stringify(this.formUsuario.value)))
      .subscribe(
        {
          next: () => {
            this.salvarSucesso()
          },
          error: () => {
            this.salvarErro()
          }
        });
  }

  validacaoCamposSenha() {
    if (this.formSenha.value !== this.formSenhaConfirmar.value) {
      this.snackBar.open('As senhas não correspondem', '', { duration: 5000 });
    }
  }

  reiniciarFormulario() {
    this.formUsuario.get('nome')?.setValue("");
    this.formUsuario.get('email')?.setValue("");
    this.formUsuario.get('senha')?.setValue("");
    this.formUsuario.get('senhaConfirmar')?.setValue("");
    this.inputNome?.nativeElement.focus();
  }

  get formNome() {
    return this.formUsuario.get('nome')!;
  }

  get formEmail() {
    return this.formUsuario.get('email')!;
  }

  get formSenha() {
    return this.formUsuario.get('senha')!;
  }

  get formSenhaConfirmar() {
    return this.formUsuario.get('senhaConfirmar')!;
  }
}