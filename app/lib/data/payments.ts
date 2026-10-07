// Payment methods. Edit here and the Ways to Pay page (/payment), the
// site-wide business structured data (paymentAccepted), and /llms.txt update.

export type PaymentMethod = {
  id: string;
  title: string;
  /** What's accepted, in short. */
  items: string[];
  /** How paying works. */
  how: string;
  /** Discount or terms line, if any. */
  terms?: string;
};

export const CASH_CRYPTO_DISCOUNT =
  "Pay with cash or crypto and save 4–8% on your invoice. The exact discount is set per invoice, with the biggest discounts on invoices over $3,000.";

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "goldback",
    title: "Goldbacks",
    items: ["Goldback notes"],
    how: "Goldbacks are accepted in person, at the time of your pickup, delivery, or appointment, at the Goldback exchange rate on the day you pay.",
    terms: "In person only. Goldback payments aren't discounted.",
  },
  {
    id: "crypto",
    title: "Cryptocurrency",
    items: ["Bitcoin (BTC)", "Dogecoin (DOGE)", "Solana (SOL)", "SUI"],
    how: "Your invoice includes a QR code with my wallet address, and you send the payment directly — no third-party processor.",
    terms: "Discounted 4–8%, set per invoice.",
  },
  {
    id: "cash",
    title: "Cash",
    items: ["U.S. dollars"],
    how: "Pay in person when we meet, at pickup, delivery, or your appointment.",
    terms: "Discounted 4–8%, set per invoice.",
  },
  {
    id: "cards",
    title: "Credit & debit cards",
    items: ["Visa", "Mastercard", "Discover", "American Express"],
    how: "Pay online through your invoice, or in person.",
  },
];

/** For schema.org `paymentAccepted`. */
export const PAYMENT_ACCEPTED =
  "Cash, Credit Card, Debit Card, Visa, Mastercard, Discover, American Express, Goldback, Bitcoin, Dogecoin, Solana, SUI";

/** One-line summary, for llms.txt and short mentions. */
export const PAYMENT_SUMMARY =
  "Accepts Goldbacks (in person, at the exchange rate on the day of payment), Bitcoin, Dogecoin, Solana, and SUI (sent directly to a wallet by QR code), cash, and Visa, Mastercard, Discover, and American Express (online invoice or in person). Cash and crypto payments are discounted 4–8%, set per invoice, with the biggest discounts on invoices over $3,000.";
