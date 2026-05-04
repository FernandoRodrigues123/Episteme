import { Routes } from '@angular/router';
import { CadastroEstudanteForm } from './componentes/cadastro-estudante-form/cadastro-estudante-form';
import { Apresentacao } from './componentes/apresentacao/apresentacao';
import { LoginEstundateForm } from './componentes/login-estundate-form/login-estundate-form';
import { Perfil } from './componentes/perfil/perfil';
import { Postagem } from './publicacao/postagem/postagem';

export const routes: Routes = [
    { path: 'cadastro-estudante', component: CadastroEstudanteForm },
    { path: '', component: Apresentacao },
    { path: 'login-estudante', component: LoginEstundateForm },
    {path: 'perfil', component: Perfil},
    {path: 'publicar', component: Postagem}

];