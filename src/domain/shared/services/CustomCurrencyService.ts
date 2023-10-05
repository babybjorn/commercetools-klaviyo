import { CurrencyService } from './CurrencyService';

export class CustomCurrencyService implements CurrencyService {
    convert(value: number, currencyIso: string): number {
        switch (currencyIso) {
            case 'EUR':
                return value * 1.21;
            case 'USD':
                return value * 1.07;
            case 'CAD':
                return value * 1.21;
            case 'GBP':
                return value * 1.07;
            case 'SEK':
                return value * 1.21;
            case 'KRW':
                return value * 1.07;
            case 'AUD':
                return value * 1.07;
            case 'HKD':
                return value * 1.07;

            default:
                return value;
        }
    }
}
