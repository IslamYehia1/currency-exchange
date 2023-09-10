import { NextRequest, NextResponse } from "next/server";
import conf from "@/config";

export async function GET(req: NextRequest, res: NextResponse) {
  const quotesRes = await fetch(
    "https://currency-exchange.p.rapidapi.com/listquotes",
    {
      headers: {
        "X-RapidAPI-Key": conf.rapidKey,
        "X-RapidAPI-Host": conf.rapidHost,
      },
    }
  );
  const currencies = await quotesRes.json();
  if (Array.isArray(currencies)) {
    return NextResponse.json(currencies);
  } else {
    return NextResponse.json(
      { error: "something went wrong while fetching the currencies" },
      { status: 503 }
    );
  }
}
