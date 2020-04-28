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
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuardService],
        data: {
          title: 'Admin Panel',
          description: 'Halaman Khusus Untuk Administrasi',
          keywords: 'Blockchain E-Voting',
          roles: [Role.Admin]
        }
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        data: {
          title: 'Home Page',
          description: 'Halaman Overview',
          keywords: 'Blockchain E-Voting'
        }
      },
      {
        path: 'status',
        loadChildren: () => import('./status/status.module').then(m => m.StatusModule),
        data: {
          title: 'Ethereum Network Status',
          description: 'Detail Jaringan Ethereum',
          keywords: 'Blockchain E-Voting'
        }
      },
      {
        path: 'election',
        loadChildren: () => import('./election/election.module').then(m => m.ElectionModule),
        data: {
          title: 'All Election',
          description: 'Daftar Semua Public Election Aktif',
          keywords: 'Blockchain E-Voting'
        }
      },
      {
        path: 'my-election',
        loadChildren: () => import('./my-election/my-election.module').then(m => m.MyElectionModule),
        canActivate: [AuthGuardService],
        data: {
          title: 'My Election',
          description: 'Halaman Daftar Pemilu Yang Dibuat Dan Diikuti',
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
