import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ListComponent } from './contacts/list/list.component';
import { HistoryComponent } from './reports/history/history.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'email/Compose',
    pathMatch: 'full'
  },
  {
    path: 'email/:id',
    loadChildren: () => import('./email/email.module').then( m => m.EmailPageModule)
  },
  {
    path: 'contacts',
    component: ListComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
