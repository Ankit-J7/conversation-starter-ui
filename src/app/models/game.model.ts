export type Screen =
  | "INTRO"
  | "QUESTION_1"
  | "REACTION"
  | "QUESTION_2"
  | "QUESTION_3"
  | "THEORY"
  | "REVEAL"
  | "FINAL";

export interface Option {
  id: string;
  emoji: string;
  label: string;
}

export interface Question {
  id: string;
  title: string;
  description?: string;
  options: Option[];
}

export interface GameAnswers {
  weekend?: string;
  travel?: string;
  conversation?: string;
}
