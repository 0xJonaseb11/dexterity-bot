import { Wallet } from "@coral-xyz/anchor";
import dexterity from "@hxronetwork/dexterity-ts";
import { Keypair, PublicKey } from "@solana/web3.js";
import {
  handleCancelSubscription,
  handleNewSubscription,
} from "./api-utils/subscritionHandler";
import { tradeHandler } from "./api-utils/tradeHandler";

const AppState = new Map<string, any>();

export const app = async () => {

  const server = Bun.serve({
    async fetch(req, server) {
      const url = new URL(req.url);
      const { pathname, searchParams } = url;

      let response: Response | undefined = new Response(
        JSON.stringify({ status: 200 })
      );

      switch (pathname) {
        case "/process-trade":
          break;
        case "/new-subscription":
          break;
        case "/cancel-subscription":
          break;
        default:
          break;
      }

      if (!response) return new Response(JSON.stringify({ status: 200 }));
      return response;
    },
  });
  console.log(`${server.url}`);
};
