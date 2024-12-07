import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  private readonly DEFAULT_TAX_RATE = 8.5;

  calculateTax(amount: number, rate: number = this.DEFAULT_TAX_RATE): number {
    return amount * (rate / 100);
  }

  getTaxRate(): number {
    return this.DEFAULT_TAX_RATE;
  }
}