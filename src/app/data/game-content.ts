import { Question } from "../models/game.model";

export const QUESTIONS: Question[] = [
  {
    id: "weekend",
    title: "You suddenly have a completely free Saturday.",
    description: "What are you most likely doing?",
    options: [
      {
        id: "random_trip",
        emoji: "✈️",
        label: "Go somewhere random",
      },
      {
        id: "stay_home",
        emoji: "🛋️",
        label: "Stay home & chill",
      },
      {
        id: "meet_friends",
        emoji: "🥂",
        label: "Meet friends",
      },
      {
        id: "depends_mood",
        emoji: "🤷",
        label: "Depends on the mood",
      },
    ],
  },

  {
    id: "travel",
    title: "You get a completely free trip tomorrow.",
    description: "Where are you going?",
    options: [
      {
        id: "beach",
        emoji: "🌊",
        label: "Beach",
      },
      {
        id: "mountains",
        emoji: "⛰️",
        label: "Mountains",
      },
      {
        id: "new_city",
        emoji: "🌆",
        label: "A new city",
      },
      {
        id: "random_place",
        emoji: "🗺️",
        label: "Somewhere completely random",
      },
    ],
  },

  {
    id: "conversation",
    title: "You meet someone new.",
    description:
      'What usually turns a "nice to meet you" into "wait, how have we been talking for an hour?"',
    options: [
      {
        id: "humour",
        emoji: "😂",
        label: "Same sense of humour",
      },
      {
        id: "interesting",
        emoji: "🧠",
        label: "Interesting conversations",
      },
      {
        id: "natural",
        emoji: "☕",
        label: "Easy, natural conversation",
      },
      {
        id: "vibes",
        emoji: "✨",
        label: "Just good vibes",
      },
    ],
  },
];

export const REACTIONS: Record<string, string> = {
  random_trip: "Okay, so sitting still clearly is not your thing. 😂",

  stay_home:
    "Fair enough. 😂 You definitely know how to appreciate a good lazy day.",

  meet_friends:
    "Makes sense. A free day is probably better when there are good people involved.",

  depends_mood: "Can’t argue with that 😂",

  beach: "Okay, that sounds like a pretty solid escape plan.",

  mountains: "Respect. A little peace and a good view never hurt anyone.",

  new_city:
    "Interesting. You seem to have at least a little curiosity for new places.",

  random_place: "Okay, I respect the chaos. 😂",
};
