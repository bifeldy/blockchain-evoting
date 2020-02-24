import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../_shared/guard/auth-guard.service';

import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuardService]
      },
      {
        path: '**',
        redirectTo: 'home'
        // loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
      }
    ]
  }
];

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesModule {}
