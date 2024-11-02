import React, { createContext, useEffect, useState } from 'react';

import { Conversion, ConversionContextType, Currency } from '../types';

const ConversionContext = createContext<ConversionContextType | undefined>(
  undefined
);

const ConversionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currencies, setCurrencies] = useState<Record<string, Currency>>({});
  const [history, setHistory] = useState<Conversion[]>(() => {
    const saved = localStorage.getItem("conversionHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Fetch currencies and set them
  }, []);

  useEffect(() => {
    localStorage.setItem("conversionHistory", JSON.stringify(history));
  }, [history]);

  return (
    <ConversionContext.Provider value={{ currencies, history, setHistory }}>
      {children}
    </ConversionContext.Provider>
  );
};

export { ConversionContext, ConversionProvider };
