import dexterity, { Trader } from "@hxronetwork/dexterity-ts";
import { sendTradeMessageToUser } from "../bot";
import { Trade } from "./types";

export const tradeHandler = async (
  req: Request,
  trader: Trader,
  CopiedTrader: undefined | Trader,
  AppState: Map<string, any>
) => {
  if (req.method != "POST") {
    return new Response(
      JSON.stringify({ error: "Wrong method, this request is POST" }),
      { status: 570 }
    );
  }

  if (!CopiedTrader) {
    return new Response(
      JSON.stringify({ error: "You have not set a trader to copy" }),
      { status: 590 }
    );
  }

  const body = (await req.json()) as Trade;

  if (
    body.maker != CopiedTrader.traderRiskGroup.toBase58() &&
    body.taker != CopiedTrader.traderRiskGroup.toBase58()
  )
    return new Response(
      JSON.stringify({
        error: "Trade does not have CopiedTrader in it",
        maker: body.maker,
        taker: body.taker,
        copiedTrader: CopiedTrader.traderRiskGroup.toBase58(),
      }),
      { status: 590 }
    );

    
};
