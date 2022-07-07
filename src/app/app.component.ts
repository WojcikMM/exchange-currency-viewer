import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ExchangeRatesClientService } from '../services/exchange-rates-client.service';
import { catchError, map, tap } from 'rxjs/operators';
import { ExchangeResultsItemDto } from '../models/exchange-results.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  exchangeRateValues$?: Observable<ExchangeResultsItemDto[]>;
  loading = false;
  searchDate?: Date;
  errorMessage?: string;

  minDate = new Date(new Date().setDate(-7));
  maxDate = new Date();

  constructor(private readonly _clientService: ExchangeRatesClientService) {
  }

  ngOnInit(): void {
    this._fetchResults()
  }

  onClearClicked(): void {
    this.searchDate = undefined;
    this._fetchResults();
  }

  onDateChanged(searchDate?: Date): void {
    this._fetchResults(searchDate);
  }

  private _fetchResults(searchDate?: Date): void {
    this.loading = true;
    this.errorMessage = '';
    const isValidDate = searchDate && !isNaN(searchDate.getTime());

    if (searchDate && !isValidDate) {
      this.errorMessage = 'Invalid date';
      this.exchangeRateValues$ = of([]);
      return;
    }

    const request = !searchDate ? this._clientService.getLatestRates$() :
      this._clientService.getExchangeRatesByDate$(new Date(searchDate))

    this.exchangeRateValues$ = request.pipe(
      map(result => {
        this.loading = false;
        return result.length == 1 ? result[0].rates : [];
      }),
      tap(result => {
        this.errorMessage = result.length === 0 ? 'No results found' : undefined;
      }),
      catchError(err => {
        this.loading = false;
        this.errorMessage = `Backend error: ${err.statusText}`;
        return throwError(err);
      })
    )
  }
}
