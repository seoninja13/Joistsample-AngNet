export class CurrencyUtils {
  static formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  static calculateTax(amount: number, rate: number): number {
    return amount * (rate / 100);
  }

  static calculateTotal(subtotal: number, taxRate: number): number {
    const tax = this.calculateTax(subtotal, taxRate);
    return subtotal + tax;
  }
}