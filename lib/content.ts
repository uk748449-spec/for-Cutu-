// Placeholder copy for every new section below. It's written in the same
// voice as the two real Stitch screens (warm, a little self-aware, teasing
// affection, "please don't bully the developer" energy) — but it's still
// placeholder. Swap every line here for something true and specific before
// this ships. Search this file for "Champa" to find every spot to edit.

export interface TimelineEvent {
  chapter: string;
  date: string;
  title: string;
  description: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    chapter: "Chapter II",
    date: "The Beginning",
    title: "When I realized you were different",
    description:
      "I don't remember the exact moment when... but I remember the feeling. The one that made me think, 'This is someone I want to know better.'",
  },
  {
    chapter: "Chapter III",
    date: "The Change",
    title: "The Chill Era",
    description:
      "At some point your Chill, Acha, Wow, and Shi h became a daily part of my life.",
  },
  {
    chapter: "Chapter IV",
    date: "The Pattern",
    title: "When it stopped being a coincidence",
    description:
      "One good conversation is luck. Ten in a row is a pattern. I noticed. I just didn't say anything about it yet.",
  },
  {
    chapter: "Chapter V",
    date: "Right Now",
    title: "This website isn't here to change your decision.",
    description:
      "This website, basically. A slightly excessive way of saying something that could've been one sentence... but where's the fun in that.",
  },
];

export interface Trait {
  icon: string;
  title: string;
  note: string;
}

export const traits: Trait[] = [
  { icon: "auto_awesome", title: "Non-chalant Bully", note: "Looks harmless... until the 'Chill', 'Acha', and 'Wow' combo starts." },
  { icon: "psychology", title: "Suspiciously perceptive", note: "You always know when something's off." },
  { icon: "bolt", title: "Full of opinions", note: "But always delaying them by saying 'sahi samay pr... karungi, btaungi etc...'" },
  { icon: "favorite", title: "Quietly kind", note: "You'd deny this if I said it to your face." },
  { icon: "local_fire_department", title: "A little dramatic", note: "In the best, most entertaining way." },
  { icon: "emoji_objects", title: "Sharper than she lets on", note: "You clock things before anyone else does." },
];

export interface AnalysisMetric {
  label: string;
  value: number;
  detail: string;
}

export const analysisMetrics: AnalysisMetric[] = [
  { label: "Sarcasm Output", value: 85, detail: "Peer-reviewed. Independently verified." },
  { label: "Patience For My Nonsense", value: 100, detail: "Higher than advertised, honestly." },
  { label: "Ability To Roast On Command", value: 70, detail: "No warm-up required." },
  { label: "Secretly Soft Energy", value: 90, detail: "Classified. You didn't hear it from me." },
];

export const analysisBadges: string[] = [
  "Certified Bully™",
  "Professional Non-chalant Bhondu",
  "Chronically Right",
  "Undefeated Debater",
];

export interface NotebookEntry {
  id: string;
  prompt: string;
  reveal: string;
}

export const notebookEntries: NotebookEntry[] = [
  {
    id: "n1",
    prompt: "Something I never said out loud",
    reveal:
      "You make ordinary conversations feel like the best part of the day, and I've never figured out how to say that without it sounding like a whole thing.",
  },
  {
    id: "n2",
    prompt: "Something I noticed but never mentioned",
    reveal:
      "You take care of people quietly, without announcing it, and then act annoyed if anyone brings it up. Noted anyway.",
  },
  {
    id: "n3",
    prompt: "Something I should've said sooner",
    reveal:
      "Talking to you is easy in a way that most things aren't. That's rarer than it sounds.",
  },
  {
    id: "n4",
    prompt: "Something I'm only admitting here",
    reveal: "This entire website is that admission. Congratulations on reaching the notebook.",
  },
];

export interface TrustPoint {
  title: string;
  description: string;
}

export const trustPoints: TrustPoint[] = [
  {
    title: "I can't change the past.",
    description:
      "But I can be honest from today onwards.",
  },
  {
    title: "Saying the true thing, even the small one",
    description:
      "Not everything needs to be a big confession. Most of trust is just not lying about the small stuff.",
  },
  {
    title: "Trust isn't rebuilt by one apology,It comes back slowly... I know that...",
    description:
      "I'd rather show you consistency than promise you impossible things.",
  },
];

export const letterParagraphs: string[] = [
  "I honestly don't know how many times I've rewritten this letter. Every version either sounded too serious, too dramatic, or simply didn't feel like me. So I decided to stop trying to write something perfect... and just write something true.",

  "Somewhere along the way, our conversations became a part of my everyday life. I started looking forward to your random messages, your 'Chill', your 'Acha', your 'Wow', even your perfectly timed bullying. I don't think you realise how much those little things slowly became normal for me.",

  "One thing I'll always regret is not telling you about my past myself. I kept convincing myself there would be a better time, and because of that, the right time never came. You deserved honesty from me first, and I'm genuinely sorry that it happened the way it did.",

  "But even after all that, whenever I think about you, I don't remember the awkward moments first. I remember the random conversations, the photos you sent me, and the countless times you left me overthinking with just one word... 'Chill.'",

  "You have this strange ability to act completely nonchalant while somehow noticing everything. You pretend nothing affects you, yet you quietly understand me more than you let me know. Maybe that's one of the reasons talking to you always felt different.",

  "This website isn't here to change your opinion, make you forgive me, or convince you of anything. I just didn't want my side of the story to remain unfinished. Some people deserve more than a few text messages... and for me, you're that one person.",

  "Whatever happens from here, I genuinely hope we keep talking, keep laughing, keep roasting each other, and keep making new memories. Maybe a little less overthinking from my side... though I can't promise that one.",

  "Thank you for being part of my life, Champa. And yes... you'll always be my favourite Nonchalant Bully™. 🤍"
];

export interface PhotoWallItem {
  id: string;
  caption: string;
}

export const photoWallItems: PhotoWallItem[] = [
  { id: "p1", caption: "The one that really makes you 'Champa Don'" },
  { id: "p2", caption: "Cuteness that comes with a beautiful smile.." },
  { id: "p3", caption: "Proof you actually do smile in photos... hehe cute na??" },
  { id: "p4", caption: "That random non-chalant look on your face" },
  { id: "p5", caption: "A completely normal day, kept anyway" },
  { id: "p6", caption: "Exhibit A in the case for 'you're not so tough'" },
];

export interface PredictionPrompt {
  id: string;
  message: string;
  replies: string[];
}

export const predictionPrompts: PredictionPrompt[] = [
  {
    id: "q1",
    message: "\"I built you an entire website.\"",
    replies: [
      "\"...why do you have this much time.\"",
      "\"This is so extra. I love it. Don't tell anyone I said that.\"",
      "\"Is this a cry for help or a personality trait at this point.\"",
    ],
  },
  {
    id: "q2",
    message: "\"I actually think about our conversations a lot.\"",
    replies: [
      "\"Concerning. Go outside.\"",
      "\"Okay that's actually kind of sweet, don't ruin it.\"",
      "\"Same, but I'll deny saying that later.\"",
    ],
  },
  {
    id: "q3",
    message: "\"You still bully me too much.\"",
    replies: [
      "\"Someone has to keep you humble.\"",
      "\"It's called character building. You're welcome.\"",
      "\"Correction: not enough.\"",
    ],
  },
];

export interface MemoryJarNote {
  id: string;
  text: string;
}

export const memoryJarNotes: MemoryJarNote[] = [
  { id: "m1", text: "that time when you sent me your vdo... that 'Udariya' one" },
  { id: "m2", text: "The joke that shouldn't have been that funny but we couldn't stop laughing." },
  { id: "m3", text: "The 2am conversation neither of us planned on having." },
  { id: "m4", text: "You pretending you weren't checking if I replied yet." },
  { id: "m5", text: "The one argument that was actually just us being right at the same time... Umm uk..." },
  { id: "m6", text: "Every time you acted tough and then immediately weren't." },
];

export const endingMessages: string[] = [
  "Thank you for taking this little journey.",
  "I genuinely hope it made you smile at least once.",
  "And yes...",
  "You still bully me too much but at some point I like that... 😊",
];
