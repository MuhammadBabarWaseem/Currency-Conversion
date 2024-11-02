import { Request, Response } from 'express';

import { CurrencyService } from '../service/currencyService';

export class CurrencyController {
  static async getCurrencies(_: Request, res: Response) {
    try {
      const data = await CurrencyService.fetchLatestRates();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async convertCurrency(req: Request, res: Response) {
    const { from, to, amount } = req.body;
    try {
      const { result, rate } = await CurrencyService.convertCurrency(
        from,
        to,
        amount
      );
      res.json({ result, rate });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
