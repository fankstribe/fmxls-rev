import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '../core/guards/admin.guard';
import { AuthGuard } from '../core/guards/auth.guard';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: '',
        redirectTo: 'admin-home',
        pathMatch: 'full',
      },
      {
        path: 'admin-home',
        loadChildren: () => import('../admin/admin-home/admin-home.module').then(m => m.AdminHomeModule),
        data: {
          title: 'Home'
        }
      },
      {
        path: 'admin-users',
        loadChildren: () => import('../admin/admin-users/admin-users.module').then(m => m.AdminUsersModule),
        data: {
          title: 'Utenti'
        }
      },
      {
        path: 'admin-teams',
        loadChildren: () => import('../admin/admin-teams/admin-teams.module').then(m => m.AdminTeamsModule),
        data: {
          title: 'Squadre'
        }
      },
      {
        path: 'admin-managers',
        loadChildren: () => import('../admin/admin-managers/admin-managers.module').then(m => m.AdminManagersModule),
        data: {
          title: 'Manager'
        },
      },
      {
        path: 'admin-tournaments',
        loadChildren: () => import('../admin/admin-tournaments/admin-tournaments.module').then(m => m.AdminTournamentsModule),
        data: {
          title: 'Tornei'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
