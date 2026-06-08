import { Component, OnInit } from '@angular/core'; // Adicionar OnInit
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Adicionar ReactiveFormsModule
import { CadastroData, CadastroEstudante } from '../../../services/cadastro-estudante';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-estudante-form',
  standalone: true, // IMPORTANTE: Adicionar isso!
  imports: [
    ReactiveFormsModule,
    CommonModule
  ], // IMPORTS OBRIGATÓRIOS para formulários
  templateUrl: './cadastro-estudante-form.html',
  styleUrl: './cadastro-estudante-form.css',
})
export class CadastroEstudanteForm implements OnInit { // Implementar OnInit
profileForm!: FormGroup;
  submitted = false;
  selectedFile: File | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroEstudante
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      dataDeNascimento: [''],
      areaDeEstudo: [''],
      email: ['', [Validators.required, Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)]],
      usuario: this.fb.group({
        login: ['', [Validators.required, Validators.minLength(4)]],
        senha: ['', [Validators.required, Validators.minLength(6)]]
      })
    });
  }

  // Getter para facilitar o acesso no template
  get f() { 
    return this.profileForm.controls; 
  }

  get usuario() {
    return this.profileForm.get('usuario') as FormGroup;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Opcional: Validar tipo e tamanho do arquivo
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        this.errorMessage = 'Tipo de arquivo não suportado. Use JPEG, PNG ou GIF.';
        this.selectedFile = null;
        return;
      }
      
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        this.errorMessage = 'Arquivo muito grande. Máximo 5MB.';
        this.selectedFile = null;
        return;
      }
      
      this.selectedFile = file;
      this.errorMessage = null;
    }
  }

  enviar(): void {
    if (this.profileForm.valid) {
      this.errorMessage = null;
      
      const formData: CadastroData = this.profileForm.value;
      
      console.log('Enviando dados:', formData);
      if (this.selectedFile) {
        console.log('Com imagem:', this.selectedFile.name);
      }
      
      this.cadastroService.cadastrar(formData, this.selectedFile || undefined).subscribe({
        next: (response) => {
          console.log('Cadastro realizado com sucesso:', response);
          this.submitted = true;
          
          setTimeout(() => {
            this.submitted = false;
            this.profileForm.reset();
            this.selectedFile = null;
          }, 3000);
        },
        error: (error) => {
          console.error('Erro no cadastro:', error);
          this.errorMessage = error.error?.message || 'Erro ao realizar cadastro. Tente novamente.';
        }
      });
    } else {
      // Marcar todos os campos como touched para mostrar erros
      this.markFormGroupTouched(this.profileForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}