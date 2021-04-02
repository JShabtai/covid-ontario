import { NgModule } from '@angular/core';
import { Route, RouterModule, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { DailyCasesComponent } from './daily-cases/daily-cases.component';
import { VaccineRegistrationComponent } from './vaccine-registration/vaccine-registration.component';

export interface CustomRoute extends Route {
    name: string;
}

export const routes: CustomRoute[] = [
    {
        name: 'PHUs',
        component: DailyCasesComponent,
        canDeactivate: [],
        matcher: (segments: UrlSegment[], group: UrlSegmentGroup, route: Route) => {
            let consumed = [];

            if (segments.length === 0) {
                consumed = segments;
            }

            return { consumed };
        }
    },
    { name: 'Vaccine Registration', path: 'vaccine-registration', component: VaccineRegistrationComponent },

    // Daily cases again to be the default
    // { name: 'PHUs 2', path: 'test', component: DailyCasesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
