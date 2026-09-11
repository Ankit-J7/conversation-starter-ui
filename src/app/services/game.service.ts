import { Injectable, computed, signal } from "@angular/core";
import { GameAnswers, Screen } from "../models/game.model";
import { QUESTIONS, REACTIONS } from "../data/game-content";
import { AnalyticsService } from "./analytics.service";

@Injectable({
  providedIn: "root",
})
export class GameService {
  readonly screen = signal<Screen>("INTRO");

  readonly answers = signal<GameAnswers>({});

  readonly currentQuestionIndex = signal(0);

  readonly currentQuestion = computed(() => {
    const index = this.currentQuestionIndex();

    if (index < 0 || index >= QUESTIONS.length) {
      return null;
    }

    return QUESTIONS[index];
  });

  readonly reaction = signal("");

  constructor(private readonly analytics: AnalyticsService) {}

  start(): void {
    this.analytics.track("START_CLICKED");

    this.screen.set("QUESTION_1");
    this.currentQuestionIndex.set(0);
  }

  selectAnswer(optionId: string): void {
    const questionId = this.currentQuestion()?.id;

    if (!questionId) {
      return;
    }

    this.answers.update((current) => ({
      ...current,
      [questionId]: optionId,
    }));

    this.analytics.track("QUESTION_ANSWERED", {
      questionId,
      optionId,
    });

    if (questionId === "weekend") {
      this.reaction.set(REACTIONS[optionId] ?? "");
      this.screen.set("REACTION");
      return;
    }

    if (questionId === "travel") {
      this.currentQuestionIndex.set(2);
      this.screen.set("QUESTION_3");
      return;
    }

    if (questionId === "conversation") {
      this.screen.set("THEORY");
    }
  }

  nextFromReaction(): void {
    this.currentQuestionIndex.set(1);
    this.screen.set("QUESTION_2");
  }

  nextFromTheory(): void {
    this.analytics.track("THEORY_VIEWED");
    this.screen.set("REVEAL");
  }

  nextFromReveal(): void {
    this.analytics.track("REVEAL_VIEWED");
    this.screen.set("FINAL");
  }

  complete(): void {
    this.analytics.track("COMPLETED");
  }

  getTheory(): string {
    const answers = this.answers();

    const observations: string[] = [];

    if (
      answers.weekend === "random_trip" ||
      answers.weekend === "depends_mood"
    ) {
      observations.push("spontaneous");
    }

    if (answers.travel === "new_city" || answers.travel === "random_place") {
      observations.push("curious about new experiences");
    }

    if (answers.conversation === "humour") {
      observations.push("a good sense of humour");
    }

    if (answers.conversation === "interesting") {
      observations.push("interesting conversations");
    }

    if (answers.conversation === "natural") {
      observations.push("natural conversations");
    }

    if (answers.conversation === "vibes") {
      observations.push("good vibes");
    }

    if (observations.length === 0) {
      return "You seem like someone who values good people and good conversations.";
    }

    if (observations.length === 1) {
      return `You seem like someone who values ${observations[0]}.`;
    }

    const last = observations[observations.length - 1];
    const first = observations.slice(0, -1).join(", ");

    return `You seem ${first} and ${last}.`;
  }

  reset(): void {
    this.screen.set("INTRO");
    this.answers.set({});
    this.currentQuestionIndex.set(0);
    this.reaction.set("");
  }
}
