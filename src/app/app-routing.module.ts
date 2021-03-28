import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DailyCasesComponent } from './daily-cases/daily-cases.component';
import { Sample2Component } from './sample2/sample2.component';

export interface CustomRoute extends Route {
    name: string;
}

export const routes: CustomRoute[] = [
    { name: 'Animation', path: 'daily-cases', component: DailyCasesComponent },

    // Daily cases again to be the default
    { name: '', path: '', component: DailyCasesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
