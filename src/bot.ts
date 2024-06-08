import TelegramBot from "node-telegram-bot-api";
import { cancelTraderSub } from "./bot-utils/cancelTraderSubHandler";
import { newTraderSubHandler } from "./bot-utils/newTraderSubHandler";

const token: string = "YOUR_TELEGRAM_BOT_TOKEN";
const chatId: number = YOUR_TELEGRAM_CHAT_ID;

const bot = new TelegramBot(token, { polling: true });

console.log("Bot is live");

bot.onText(/\/newcopy (.+)/, async (msg, match) => {
 if (msg.chat.id !== chatId) return;

 if (!match || !match[1]) {
   return bot.sendMessage(
     chatId,
     "Please provide the trader's TRG pubkey in the correct format: /newcopy {trg-pubkey}"
   );
 }

 bot.sendMessage(chatId, "Subscribing to trader...");

 try {
   const response = (await newTraderSubHandler(match[1])) as any;

   let responseMessage = "";

   if (!response || !response.ok) {
     responseMessage =
       "Error: Unable to subscribe to the trader or to copy initial positions.";
   } else {
     responseMessage = `Successfully subscribed to New Trader!\n\nCopied Trader: ${response.newTrg}`;
     if (response.signature) {
       responseMessage += `\n\nSuccessfully copied initial positions:\nhttps://solscan.io/tx/${response.signature}?cluster=devnet`;
     }
   }

   bot.sendMessage(chatId, responseMessage);
 } catch (error) {
   console.error("Subscription Error:", error);
   bot.sendMessage(
     chatId,
     "An error occurred while processing your request. Please try again later."
   );
 }
});

bot.onText(/\/cancelcopy/, async (msg, match) => {
 if (msg.chat.id != chatId) return;

 if (!match) return bot.sendMessage(chatId, "Wrong format");

 const response = (await cancelTraderSub()) as any;

 let resp: string;

 if (!response || !response.ok) {
   resp = `Error: Unable to close trader subscription`;
 } else {
   resp = `Successfully unsubscribed from trader`;
 }

 bot.sendMessage(chatId, resp);
});

export const sendTradeMessageToUser = async (tradeInfo: {
 signature: string;
 productName: string;
 productIndex: any;
 isBid: boolean;
 priceFractional: number;
 sizeFractional: number;
 positioningRatio: any;
}) => {
 const tradeInfoMessage = `Successfully Copied Trade:
   - Product Name: ${tradeInfo.productName}
   - Product Index: ${tradeInfo.productIndex}
   - Bid/Ask: ${tradeInfo.isBid ? "Bid" : "Ask"}
   - Price: ${tradeInfo.priceFractional}
   - Size: ${tradeInfo.sizeFractional}
   - Positioning Ratio: ${tradeInfo.positioningRatio}
   - Transaction:
   https://solscan.io/tx/${tradeInfo.signature}?cluster=devnet`;

 bot.sendMessage(chatId, tradeInfoMessage);
};

bot.onText(/\/start/, (msg) => {
 const welcomeMessage = `Welcome to the Trade Copy Bot! 🤖 Here's how you can get started:
  - Use /help to view all the commands.
 - Use /newcopy {trg-pubkey} to subscribe to a new trader.
 - Use /cancelcopy to cancel the subscription.
  Feel free to explore and let me know if you have any questions!`;

 bot.sendMessage(msg.chat.id, welcomeMessage);
});

bot.onText(/\/help/, (msg) => {
 const helpMessage = `Here's how to use the bot commands:
  - Use /help to view all the commands.
 - Use /newcopy {trg-pubkey} to subscribe to a new trader.
 - Use /cancelcopy to cancel the subscription.
  If you have any questions or need further assistance, please reach out!`;

 bot.sendMessage(msg.chat.id, helpMessage);
});

