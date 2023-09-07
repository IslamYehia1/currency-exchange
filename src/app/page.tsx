"use client";
import Image from "next/image";
import S from "./page.module.scss";
import SwapIcon from "./swap.svg";
import Dropdown from "./Dropdown";

import { useState, useEffect } from "react";
const options = [
  {
    code: "USD",
    title: "US Dollar",
  },
  {
    code: "EUR",
    title: "Euros",
  },
  {
    code: "EGP",
    title: "Egyptian Pounds",
  },
  {
    code: "JPY",
    title: "Japanese Yen",
  },
];

export default function Home() {
  const [sourceCurrency, setSourceCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [amount, setAmount] = useState(1);
  function handleSwap() {
    const srcCurrencyTemp = sourceCurrency;
    setSourceCurrency(toCurrency);
    setToCurrency(srcCurrencyTemp);
  }
  return (
    <main className={S.main}>
      <div className={S.wrapper}>
        <div className={S.formWrapper}>
          <label htmlFor="amount">Amount:</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            id="name"
            name="amount"
          />
          <div></div>
          <label htmlFor="sourceCurrency">From</label>
          <Dropdown
            onSelect={(selected: any) => setSourceCurrency(selected)}
            list={options}
            selected={sourceCurrency}
            title={"Currency"}
            disabled={toCurrency}
          />
          <div></div>
          <div></div>
          <div className={S.swapBtnWrapper}>
            <button onClick={handleSwap} className={S.swapBtn}>
              <SwapIcon />
            </button>
          </div>
          <div></div>
          <label htmlFor="sourceCurrency">To</label>
          <Dropdown
            onSelect={(selected: any) => setToCurrency(selected)}
            list={options}
            selected={toCurrency}
            disabled={sourceCurrency}
            title={"Currency"}
          />
          <div></div>
        </div>
        <button>Submit</button>
      </div>
    </main>
  );
}
