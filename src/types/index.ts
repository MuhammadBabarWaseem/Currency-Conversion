export interface Conversion {
  id: string;
  from: string;
  to: string;
  amount: number;
  result: number;
  rate: number;
  timestamp: string;
}

export interface Currency {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
}

export interface ConversionContextType {
  currencies: Record<string, Currency>;
  history: Conversion[];
  setHistory: React.Dispatch<React.SetStateAction<Conversion[]>>;
}

export interface ConversionHistoryProps {
  history: Conversion[];
  currencies: Record<string, Currency>;
}
