import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExchangeResultsDto } from '../models/exchange-results.dto';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ExchangeRatesClientService {

  constructor(private readonly _client: HttpClient) {
  }

  getLatestRates$(): Observable<ExchangeResultsDto[]> {
    return this._client.get<ExchangeResultsDto[]>('https://api.nbp.pl/api/exchangerates/tables/A/?format=json')
  }

  getExchangeRatesByDate$(ratesDate: Date): Observable<ExchangeResultsDto[]> {
    const [dateString] = ratesDate.toISOString().split('T');
    return this._client.get<ExchangeResultsDto[]>(`https://api.nbp.pl/api/exchangerates/tables/A/${dateString}/?format=json`);
  }

}
