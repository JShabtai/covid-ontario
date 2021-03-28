import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

export enum DataNames {
    PhuDailyCases = 'cases_by_status_and_phu.json',
    // PhuDailyCases = 'phu_daily_cases.json',
    PhuMetadata = 'phu_metadata.json',
    ResponseFramework = 'response_framework.json',
}

@Injectable({
    providedIn: 'root'
})
export class DataFetcherService {
    private data: Record<string, Observable<object>> = {};

    constructor(
        private http: HttpClient,
    ) { }

    public fetchData(name: DataNames): Observable<object> {
        if (!this.data[name]) {
            this.data[name] = this.http.get(`/assets/${name}`, {
                responseType: "json"
            });
        }
        return this.data[name];
    }
}
