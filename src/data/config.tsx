export const CHARACTERS = [
  {
    theme: "dark",
    id: "Hawk",
    name: "Hawk",
  },
  {
    theme: "dark",
    id: "Choco",
    name: "Choco",
  },
  {
    theme: "light",
    id: "River",
    name: "River",
  },
] as const;

export const FAQ_OPTIONS = [
  "The Memecoin Philosophy",
  "Pre-Trading Checklist: 10-Second Rule",
  "Detailed Steps for Memecoin Analysis",
  "Market Cap & Liquidity-Based Strategy for Meme Coins",
  "Entry and Exit Strategies",
  "Psychological Guidelines",
  "Tools to Use",
] as const;

export const QUICK_CHAT_OPTIONS = [
  "My Top 5 Fumbles",
  "My Top 5 Biggest REKT (Loss)",
  "Analyze my Past 5 Trades",
  "Give me info on $MOODENG",
  "What do you think of $MOG?",
] as const;

export const FOUNDERS = [
  {
    name: "dev",
    imageSrc: "dev.jpg",
  },
] as const;

export const CHATFLOW_MAPPING = {
  INTENT_RECOGNIZER: "651882d0-5e04-4dd4-9707-64821ec80c0d",
  FAQ: "cb78c4a6-a94b-41fd-a365-56704f0b9126",
  LOSS: "861053dd-b9f9-476f-9367-3df6a670faaa",
  FUMBLE: "55c26eaf-1895-41a2-a0af-076b463e2ab7",
  TRADES: "3a5432e8-9e25-4760-8ccf-cc4849c37328",
  ANALYSIS: "cb78c4a6-a94b-41fd-a365-56704f0b9126",
};
