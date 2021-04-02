import { Component, OnInit } from '@angular/core';

import { Phu, registrationData } from './registration';

@Component({
  selector: 'app-vaccine-registration',
  templateUrl: './vaccine-registration.component.html',
  styleUrls: ['./vaccine-registration.component.scss']
})
export class VaccineRegistrationComponent {
    public getUrlDisplayText(phu: Phu): string {
        if (phu.url === 'https://covid-19.ontario.ca/book-vaccine/') {
            return 'Provincial Booking Portal';
        }

        if (phu.url.length > 70) {
            return phu.url.substr(0, 60) + '...';
        }

        return phu.url;
    }

    public email = 'josh.vaccinedashboard@shabtai.ca';
    public twitter = 'Josh_Shabtai_Ca';
    public displayedColumns: string[] = ['name', 'url', 'minAge', 'preRegistration', 'lastUpdated', /* 'criteria', */];

    public phus: Phu[] = Object.values(registrationData).sort((a, b) => { return a.name > b.name ? 1 : -1 });
}
