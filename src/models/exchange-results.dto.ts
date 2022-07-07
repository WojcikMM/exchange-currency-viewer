export interface ExchangeResultsItemDto {
  code: string;
  currency: string;
  mid: number;
}

export interface ExchangeResultsDto {
  effectiveDate: Date;
  no: string;
  table: string;
  rates: ExchangeResultsItemDto[]
}
