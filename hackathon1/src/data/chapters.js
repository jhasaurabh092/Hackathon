// SaveForge - All 15 Chapters Data

const chapters = [
  // ─── LEVEL 1: Basics of Money ───────────────────────────────────────
  {
    id: 1,
    level: 1,
    title: "Spend vs Save",
    emoji: "💵",
    text: "You just got ₹40 pocket money from Dad! 🎉 Your friend is selling candy for ₹40 right now. Do you buy it all, or save it for later?",
    choices: [
      { label: "🛍️ Spend it all on candy!", desc: "Tasty, but gone in minutes...", money: -40 },
      { label: "💰 Save it in my piggy bank", desc: "Smart! You'll have more options later.", money: +10 },
    ],
  },
  {
    id: 2,
    level: 1,
    title: "Spend vs Invest",
    emoji: "📈",
    text: "Your neighbour Raju sells lemonade and wants you to invest ₹30 in his business. He promises to return ₹50 next week. Or you could buy a new video game for ₹30 today.",
    choices: [
      { label: "🎮 Buy the video game", desc: "Fun now, but money is gone.", money: -30 },
      { label: "📈 Invest in Raju's lemonade stand", desc: "Risky, but could pay off!", money: +20 },
    ],
  },
  {
    id: 3,
    level: 1,
    title: "Save vs Invest",
    emoji: "🏦",
    text: "You have ₹50 saved up. You can keep it safely under your mattress, or invest it in the school book fair to earn profit by reselling books.",
    choices: [
      { label: "💰 Keep it safe under the mattress", desc: "Safe, but no growth.", money: +5 },
      { label: "📚 Invest in the book fair", desc: "Educated bet for more returns!", money: +25 },
    ],
  },
  {
    id: 4,
    level: 1,
    title: "Spend vs Fraud",
    emoji: "⚠️",
    text: "A stranger online messages you: 'Send me ₹20 now and I'll send you ₹200 tomorrow! Guaranteed!' 🔴 What do you do?",
    choices: [
      { label: "⚠️ Send ₹20 to the stranger", desc: "This looks like a scam...", money: -20 },
      { label: "🛡️ Ignore — it's a fraud!", desc: "Smart! Never trust free money promises.", money: +15 },
    ],
  },
  {
    id: 5,
    level: 1,
    title: "Smart vs Bad Spending",
    emoji: "🧠",
    text: "You have ₹35. You can buy new school stationery (pencils, notebooks) OR spend it on a limited edition sticker pack that you'll forget about in a week.",
    choices: [
      { label: "🖊️ Buy school stationery", desc: "Useful every day — great choice!", money: +10 },
      { label: "🌟 Buy the fancy sticker pack", desc: "Cool for a day, regret forever.", money: -25 },
    ],
  },

  // ─── LEVEL 2: Investment Decisions ──────────────────────────────────
  {
    id: 6,
    level: 2,
    title: "Short vs Long Term",
    emoji: "⏳",
    text: "A trusted uncle offers two deals: Invest ₹40 now and get ₹50 back next week (short-term), OR invest ₹40 and get ₹80 after completing all your levels (long-term). Which do you choose?",
    choices: [
      { label: "⚡ Short-term: Get ₹50 next week", desc: "Quick return, smaller gain.", money: +10 },
      { label: "🌱 Long-term: Get ₹80 at level end", desc: "Patient investing pays more!", pending: +40 },
    ],
  },
  {
    id: 7,
    level: 2,
    title: "Good vs Bad Investment",
    emoji: "📊",
    text: "Two opportunities: Invest ₹30 in a school canteen startup (verified, track record of success), OR invest ₹30 in a new app idea by a classmate with no plan.",
    choices: [
      { label: "🍱 Invest in school canteen startup", desc: "Reliable, proven business!", money: +30 },
      { label: "📱 Invest in classmate's app idea", desc: "High risk, no plan — risky!", money: -20 },
    ],
  },
  {
    id: 8,
    level: 2,
    title: "Fraud vs Genuine Investment",
    emoji: "🕵️",
    text: "'DOUBLE YOUR MONEY IN 24 HOURS!' shouts a WhatsApp forward with 1000 forwards. Your friend Priya says invest ₹50 in her mother's verified handicraft business instead.",
    choices: [
      { label: "📲 Try the WhatsApp scheme", desc: "Classic fraud — always fake!", money: -50 },
      { label: "🧵 Invest in Priya's mom's business", desc: "Verified, real business. Smart!", money: +35 },
    ],
  },
  {
    id: 9,
    level: 2,
    title: "Save vs FOMO Investing",
    emoji: "🎯",
    text: "Everyone at school is putting money into 'CoolCrypto' because it went up 500% last week! The hype is HUGE. Or you can keep saving steadily.",
    choices: [
      { label: "🚀 Invest in CoolCrypto (FOMO!)", desc: "Bought at peak — it crashes!", money: -40 },
      { label: "💰 Stay calm and keep saving", desc: "Patience avoids painful losses.", money: +15 },
    ],
  },
  {
    id: 10,
    level: 2,
    title: "Invest in Falling Market vs Avoid",
    emoji: "📉",
    text: "Science kits market is DOWN 30% due to seasonal changes, but experts say it will recover next season. Do you buy at low price or avoid the falling market?",
    choices: [
      { label: "📉 Buy when market is low", desc: "Brave! Buy low, sell high strategy.", money: +50 },
      { label: "🚫 Avoid — too risky right now", desc: "Safe, but missed big opportunity.", money: +5 },
    ],
  },

  // ─── LEVEL 3: Spending + Fraud + Values ─────────────────────────────
  {
    id: 11,
    level: 3,
    title: "Self-Improvement vs Phishing",
    emoji: "🎓",
    text: "Option A: Spend ₹40 on an online coding course to improve your skills. Option B: A popup says 'You won! Click here and pay ₹40 processing fee to claim ₹5000 prize!'",
    choices: [
      { label: "💻 Buy the coding course", desc: "Skills last a lifetime!", money: -40 + 60 },
      { label: "🎁 Pay the ₹40 processing fee", desc: "It's a phishing scam! You lost money!", money: -40 },
    ],
  },
  {
    id: 12,
    level: 3,
    title: "Family vs Luxury",
    emoji: "❤️",
    text: "Your mom's birthday is coming! You can buy her a heartfelt gift (₹30) and make her day special, OR spend it on an expensive branded cap for yourself (₹60, very cool but...).",
    choices: [
      { label: "🎂 Buy Mom a birthday gift", desc: "Thoughtful & meaningful spending!", money: +20 },
      { label: "🧢 Buy the expensive branded cap", desc: "Cool, but selfish choice today.", money: -40 },
    ],
  },
  {
    id: 13,
    level: 3,
    title: "Save for Future vs Instant Gratification",
    emoji: "🚗",
    text: "You're saving up for a bicycle (₹500 goal, you need 3 more months of saving). But the new phone case you want is ₹60 and sale ends today! What's more important?",
    choices: [
      { label: "🚲 Stay disciplined, keep saving", desc: "Delayed gratification — future you thanks you!", money: +25 },
      { label: "📱 Buy the phone case on sale", desc: "Spending savings goal money on wants.", money: -40 },
    ],
  },
  {
    id: 14,
    level: 3,
    title: "Friend's Suspicious Request",
    emoji: "🤝",
    text: "An online 'friend' you've never met in person urgently asks: 'Bro I need ₹50 RIGHT NOW. My mom is sick. I swear I'll return it tomorrow.' He refuses to video call.",
    choices: [
      { label: "💸 Send ₹50 — trust the friend", desc: "Never met, refuses call — classic scam!", money: -50 },
      { label: "🛡️ Refuse — too suspicious", desc: "Good instinct! Protect your money online.", money: +10 },
    ],
  },
  {
    id: 15,
    level: 3,
    title: "Donate vs Luxury",
    emoji: "🌟",
    text: "FINAL CHAPTER! You see a verified charity helping flood-affected kids with ₹30 donation. OR you could buy a shiny luxury watch for ₹80 (you already have a watch).",
    choices: [
      { label: "❤️ Donate ₹30 to flood victims", desc: "Empathy & social responsibility — HERO move!",money: -20 },
      { label: "⌚ Buy the luxury watch", desc: "Materialistic — do you really need it?", money: -60 },
    ],
  },
];

export default chapters;
