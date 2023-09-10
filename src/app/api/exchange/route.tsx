import { NextRequest, NextResponse } from "next/server";
import conf from "@/config";
console.log(conf.rapidKey, conf.rapidHost);
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const q = searchParams.get("q");

  if (!(from && to && q)) {
    NextResponse.json(
      { error: "Please make sure the from & to & q fields are valid" },
      { status: 400 }
    );
  }
  try {
    const quotesRes = await fetch(
      `https://currency-exchange.p.rapidapi.com/exchange?from=${from}&to=${to}&q=${q}`,
      {
        headers: {
          "X-RapidAPI-Key": conf.rapidKey,
          "X-RapidAPI-Host": conf.rapidHost,
        },
      }
    );
    const quoteString = await quotesRes.text();
    const quote = Number(quoteString);
    const result = quote * Number(q);
    return new Response(`${result}`);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "something went wrong while fetching the currencies" },
      { status: 503 }
    );
  }
}
