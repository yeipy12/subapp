import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'subasta',
    loadChildren: () => import('./pages/subasta/subasta.module').then( m => m.SubastaPageModule)
  },
  {
    path: 'categoria',
    loadChildren: () => import('./pages/categoria/categoria.module').then( m => m.CategoriaPageModule)
  },
  {
    path: 'busqueda',
    loadChildren: () => import('./pages/busqueda/busqueda.module').then( m => m.BusquedaPageModule)
  },
  {
    path: 'sobre',
    loadChildren: () => import('./pages/sobre/sobre.module').then( m => m.SobrePageModule)
  },
  {
    path: 'recupecontra',
    loadChildren: () => import('./pages/recupecontra/recupecontra.module').then( m => m.RecupecontraPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'modificar-perfil',
    loadChildren: () => import('./pages/modificar-perfil/modificar-perfil.module').then( m => m.ModificarPerfilPageModule)
  },
  {
    path: 'modificar-contrasena',
    loadChildren: () => import('./pages/modificar-contrasena/modificar-contrasena.module').then( m => m.ModificarContrasenaPageModule)
  },
  {
    path: 'nissanz',
    loadChildren: () => import('./pages/nissanz/nissanz.module').then( m => m.NissanzPageModule)
  },
  {
    path: 'raptorrrr',
    loadChildren: () => import('./pages/raptorrrr/raptorrrr.module').then( m => m.RaptorrrrPageModule)
  },
  {
    path: 'subarustiii',
    loadChildren: () => import('./pages/subarustiii/subarustiii.module').then( m => m.SubarustiiiPageModule)
  },
  {
    path: 'mazdarx77',
    loadChildren: () => import('./pages/mazdarx77/mazdarx77.module').then( m => m.Mazdarx77PageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  }


  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
