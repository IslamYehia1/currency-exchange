import { useEffect, useState } from "react";
import Dropdown from "@/components/Dropdown";
import api from "@/api";
import S from "./exchangeForm.module.scss";
import LoadingInput from "@/components/LoadingInput";
import { SwapIcon } from "@/components/Icons";
const DEFAULT_AMOUNT = (1).toFixed(1);
type propsT = {
  list: Array<string> | null;
  onResult: (result: {}) => void;
  onLoading?: () => void;
  onReset: () => void;
  onError: () => void;
};

function ExchangeForm({ list, onResult, onReset, onError, onLoading }: propsT) {
  const [fromCurrency, setfromCurrency] = useState<null | number>(null);
  const [toCurrency, setToCurrency] = useState<null | number>(null);
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);
  const [isLoading, setIsLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  useEffect(() => {
    if (!(fromCurrency && toCurrency && amount && list)) return;
    const getData = setTimeout(() => {
      handleSubmit();
    }, 2000);
    return () => clearTimeout(getData);
  }, [list, amount, fromCurrency, toCurrency]);
  function handleSwap() {
    const srcCurrencyTemp = fromCurrency;
    setfromCurrency(toCurrency);
    setToCurrency(srcCurrencyTemp);
  }
  async function handleSubmit() {
    if (!(list && fromCurrency !== null && toCurrency !== null && amount)) return;
    setShowPrompt(false);
    if (onLoading) onLoading();
    setIsLoading(true);
    const from = list[fromCurrency];
    const to = list[toCurrency];
    const res = await api.getExchangeRate(from, to, `${amount}`);
    if (res.ok) {
      const result = await res.text();
      onResult({ amount, resultAmount: result, from, to });
    } else {
      onError();
    }
    setIsLoading(false);
  }
  function handleReset() {
    setAmount(DEFAULT_AMOUNT);
    setfromCurrency(null);
    setToCurrency(null);
    onReset();
  }

  function handleAmountChange(e: any) {
    setAmount(e.target.value);
  }
  return (
    <>
      <div className={S.formWrapper}>
        {/* The empty divs support the css grid */}
        <label htmlFor="amount">Amount:</label>
        <LoadingInput
          value={amount}
          onChange={handleAmountChange}
          type="number"
          name="amount"
          placeholder="0.0"
          step="any"
          isLoading={isLoading}
          className={S.formInput}
        />
        <div></div>
        <label htmlFor="fromCurrency">From</label>
        <Dropdown
          onSelect={(selected: number | null) => setfromCurrency(selected)}
          list={list}
          selected={fromCurrency}
          title={"Currency"}
          disabled={toCurrency}
          headerClass={S.formInput}
        />

        <div></div>
        <div></div>
        <div className={S.swapBtnWrapper}>
          <button onClick={handleSwap} className={`${S.swapBtn}`}>
            <SwapIcon />
          </button>
        </div>
        <div></div>
        <label htmlFor="fromCurrency">To</label>
        <Dropdown
          onSelect={(selected: any) => setToCurrency(selected)}
          list={list}
          selected={toCurrency}
          disabled={fromCurrency}
          title={"Currency"}
          headerClass={S.formInput}
        />
        <div></div>
      </div>

      {showPrompt ? (
        <div className={S.prompt}>
          Please type the amount, from and to currencies then wait to get the
          results
        </div>
      ) : null}
      <button onClick={handleReset} className={S.resetBtn}>
        Reset
      </button>
    </>
  );
}
export default ExchangeForm;
