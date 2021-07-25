import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// pages
import { ProjectsNewPage } from './projects/new/new.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'projects/new' },
  { path: 'projects/new', component: ProjectsNewPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
