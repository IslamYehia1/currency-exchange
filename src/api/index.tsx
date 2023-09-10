export default {
  getAvailableCurrencies: () => {
    return fetch("/api/currencies");
  },

  getExchangeRate: (
    srcCurrency: string,
    destCurrency: string,
    amount: string
  ) => {
    return fetch(
      `/api/exchange?from=${srcCurrency}&to=${destCurrency}&q=${amount}`
    );
  },
};
