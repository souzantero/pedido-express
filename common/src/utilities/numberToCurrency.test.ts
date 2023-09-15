import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';
import { numberToCurrency } from './numberToCurrency';

describe('numberToCurrency', () => {
  it('should convert number to currency', () => {
    const number = 1000;
    const currency = numberToCurrency(number);
    strictEqual(currency, 'R$ 1.000,00');
  });
});