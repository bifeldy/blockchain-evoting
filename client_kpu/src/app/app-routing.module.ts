import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./_shared/components/login/login.module').then(m => m.LoginModule),
    data: {
      title: 'Bifeldy | Login Page',
      description: 'Halaman Login',
      keywords: 'Blockchain E-Voting'
    }
  },
  {
    path: 'register',
    loadChildren: () => import('./_shared/components/register/register.module').then(m => m.RegisterModule),
    data: {
      title: 'Bifeldy | Register Page',
      description: 'Halaman Pendaftaran',
      keywords: 'Blockchain E-Voting'
    }
  },
  {
    path: '',
    loadChildren: () => import('./_pages/pages.module').then(m => m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
