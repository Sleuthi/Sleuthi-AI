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
  LOSS: "0372bea4-27f8-4605-a883-8d23394c4823",
  FUMBLE: "bbf31c1d-4d1d-4f71-9f19-2ac86a53451d",
  TRADES: "cd9ece01-9591-4a74-9d2f-3d1b1f466c25",
  ANALYSIS: "15576910-5cc3-469d-ab8e-04e29bee9f66",
};
