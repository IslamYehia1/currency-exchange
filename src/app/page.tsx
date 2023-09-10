"use client";
import ExchangeForm from "@/pages-components/Home/ExchangeForm";
import S from "./page.module.scss";
import api from "@/api";
import { useState, useEffect } from "react";
export default function Home() {
  const [list, setList] = useState<null | Array<string>>([]);
  const [result, setResult] = useState<null | { [key: string]: string }>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    //Get available exchange currencies
    async function getCurrenciesList() {
      const res = await api.getAvailableCurrencies();
      if (res.ok) {
        const currencies = await res.json();
        if (Array.isArray(currencies)) {
          setList(currencies);
        } else {
          console.error(
            "Something went wrong while getting available currencies!"
          );
        }
      } else {
        setError("Couldn't get available currencies, please try again");
      }
    }

    getCurrenciesList();
  }, []);

  function handleResult(result: { [key: string]: string }) {
    setError("");
    setResult(result);
  }
  function handleReset() {
    setResult(null);
  }
  function handleFormError() {
    setError("Something went wrong, please try again");
  }
  function handleFormLoading() {
    setResult(null);
    setError("");
  }
  return (
    <main className={S.main}>
      <h1>Money Exchange</h1>
      <div className={S.wrapper}>
        <ExchangeForm
          onResult={handleResult}
          onReset={handleReset}
          list={list}
          onError={handleFormError}
          onLoading={handleFormLoading}
        />
        {result && !error ? (
          <div className={S.result}>
            <div>
              {result.amount} {result.from} =
            </div>
            <div>
              {result.resultAmount} {result.to}
            </div>
          </div>
        ) : null}
        {error ? <div className={S.error}>{error} </div> : null}
      </div>
    </main>
  );
}
