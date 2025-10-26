import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGridComponent } from './components/user-grid/user-grid.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [
  { path: '', component: UserGridComponent },
  { path: 'user/:id', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
