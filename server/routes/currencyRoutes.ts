import express from 'express';

import { CurrencyController } from '../controllers/currencyController';

const router = express.Router();

router.get("/currencies", CurrencyController.getCurrencies);
router.post("/convert", CurrencyController.convertCurrency);

export default router;