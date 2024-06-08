import { Manifest, Trader } from "@hxronetwork/dexterity-ts";
import { PublicKey } from "@solana/web3.js";
import { accountPositioningHandler } from "./accountPositioningHandler";

export const handleNewSubscription = async (
  trader: Trader,
  manifest: Manifest,
  newTrg: string | null,
  AppState: Map<string, any>
) => {

};

export const handleCancelSubscription = async (
  AppState: Map<string, any>
) => {

};
