import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../_shared/guard/auth-guard.service';

import { PagesComponent } from './pages.component';
import { Role } from '../_shared/models/role';

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
        canActivate: [AuthGuardService],
        data: {
          title: 'Bifeldy | Home Page',
          description: 'Halaman Overview',
          keywords: 'Blockchain E-Voting',
          roles: [Role.Admin, Role.Miner, Role.Voter]
        }
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
