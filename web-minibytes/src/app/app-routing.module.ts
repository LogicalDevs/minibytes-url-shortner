import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUrlComponent } from './modals/create-url/create-url.component';
import { ClientPanelComponent } from './pages/client-panel/client-panel.component';
import { HomeComponent } from './pages/home/home.component';
import { RedirectComponent } from './pages/redirect/redirect.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'client-panel', component: ClientPanelComponent},
  {path: ':url', component: RedirectComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
