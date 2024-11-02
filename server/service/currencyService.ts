import axios from 'axios';

import { config } from '../config/config';
import { CurrencyResponse } from '../types/index';

export class CurrencyService {
  static async fetchLatestRates() {
    const response = await axios.get(`${config.baseUrl}/latest`, {
      headers: { apikey: config.apiKey },
    });
    return response.data;
  }

  static async convertCurrency(from: string, to: string, amount: number) {
    const response = await axios.get<CurrencyResponse>(
      `${config.baseUrl}/latest`,
      {
        headers: { apikey: config.apiKey },
        params: {
          base_currency: from,
          currencies: to,
        },
      }
    );

    const rate = response.data.data[to];
    return { result: amount * rate, rate };
  }
}
