export type Trade = {
  product: string;
  taker_side: "bid" | "ask";
  quote_size: number;
  base_size: number;
  maker: string;
  taker: string;
  price: number;
};
