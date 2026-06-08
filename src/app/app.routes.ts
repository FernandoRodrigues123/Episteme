import { Routes } from '@angular/router';
import { CadastroEstudanteForm } from './componentes/estudante/cadastro-estudante-form/cadastro-estudante-form';
import { Apresentacao } from './componentes/apresentacao/apresentacao';
import { LoginEstundateForm } from './componentes/estudante/login-estundate-form/login-estundate-form';
import { Perfil } from './componentes/estudante/perfil/perfil';
import { Postagem } from './componentes/publicacao/postagem/postagem';
import { Atualizacao } from './componentes/publicacao/atualizacao/atualizacao';
import { PublicacaoDetalhes } from './componentes/publicacao/publicacao-detalhes/publicacao-detalhes';
import { AtualizarEstudanteForm } from './componentes/estudante/atualizar-estudante-form/atualizar-estudante-form';

export const routes: Routes = [
    { path: 'cadastro-estudante', component: CadastroEstudanteForm },
    { path: '', component: Apresentacao },
    { path: 'login-estudante', component: LoginEstundateForm },
    { path: 'perfil', component: Perfil },
    { path: 'publicar', component: Postagem },
    { path: 'atualizarPublicacao/**', component: Atualizacao },
    { path: 'publicacao/:id',  component: PublicacaoDetalhes },
    { path: 'editarPerfil', component: AtualizarEstudanteForm }
];