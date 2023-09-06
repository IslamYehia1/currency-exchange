"use client";
import Image from "next/image";
import S from "./page.module.scss";
import SwapIcon from "./swap.svg";
import Dropdown from "./Dropdown";

import { useState, useEffect } from "react";
const options = [
  {
    id: 0,
    title: "New York",
    selected: false,
    key: "location",
  },
  {
    id: 1,
    title: "Dublin",
    selected: false,
    key: "location",
  },
  {
    id: 2,
    title: "California",
    selected: false,
    key: "location",
  },
  {
    id: 3,
    title: "Istanbul",
    selected: false,
    key: "location",
  },
  {
    id: 4,
    title: "Izmir",
    selected: false,
    key: "location",
  },
  {
    id: 5,
    title: "Oslo",
    selected: false,
    key: "location",
  },
];

export default function Home() {
  const [sourceCurrency, setSourceCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  return (
    <main className={S.main}>
      <div className={S.wrapper}>
        <div className={S.dropdown}>
          <label htmlFor="sourceCurrency">From</label>
          <Dropdown
            onSelect={(selected: any) => setSourceCurrency(selected)}
            list={options}
            selected={sourceCurrency}
            title={"Currency"}
          />
        </div>
        <div className={S.dropdown}>
          <label htmlFor="sourceCurrency">To</label>
          <Dropdown
            onSelect={(selected: any) => setToCurrency(selected)}
            list={options}
            selected={toCurrency}
            title={"Currency"}
          />
        </div>
        <div className={S.inputGroup}>
          <label htmlFor="name">From:</label>
          <input type="text" id="name" name="user_name" />
        </div>
        <button className={S.swapBtn}>
          <SwapIcon />
        </button>
        <div className={S.inputGroup}>
          <label htmlFor="name">To:</label>
          <input type="text" id="name" name="user_name" />
        </div>
      </div>
    </main>
  );
}
