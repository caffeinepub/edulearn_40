import { Skeleton } from "@/components/ui/skeleton";
import { MoreHorizontal, PlayCircle } from "lucide-react";
import { useState } from "react";
import type { FlashcardDeck } from "../backend";
import {
  useFlashcardDecks,
  useQuizQuestions,
  useSubjects,
} from "../hooks/useQueries";
import FlashcardModal from "./FlashcardModal";

interface Props {
  onStartQuiz: (subjectId: bigint) => void;
}

const progressColors = ["#2D7EF7", "#F26A3D", "#10B981", "#8B5CF6"];
const DECK_SKELETON_KEYS = ["sk-deck-1", "sk-deck-2", "sk-deck-3", "sk-deck-4"];
const QUIZ_SKELETON_KEYS = ["sk-quiz-1", "sk-quiz-2", "sk-quiz-3"];

export default function InteractiveLearning({ onStartQuiz }: Props) {
  const { data: subjects } = useSubjects();
  const firstSubjectId = subjects?.[0]?.id ?? null;
  const { data: decks, isLoading: decksLoading } =
    useFlashcardDecks(firstSubjectId);
  const { data: quizQuestions, isLoading: quizLoading } =
    useQuizQuestions(firstSubjectId);
  const [reviewDeck, setReviewDeck] = useState<FlashcardDeck | null>(null);

  const recommendedQuestions = quizQuestions?.slice(0, 3) ?? [];

  return (
    <section id="flashcards" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#111827" }}>
            Interactive Learning
          </h2>
          <p className="text-base" style={{ color: "#4B5563" }}>
            Review your flashcard decks and tackle recommended quizzes.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3
              className="font-semibold text-lg mb-4"
              style={{ color: "#111827" }}
            >
              Your Flashcard Decks
            </h3>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              data-ocid="flashcards.list"
            >
              {decksLoading
                ? DECK_SKELETON_KEYS.map((key, i) => (
                    <div
                      key={key}
                      className="border border-border rounded-xl p-4 bg-background"
                      data-ocid={`flashcards.item.${i + 1}`}
                    >
                      <Skeleton className="h-4 w-2/3 mb-2" />
                      <Skeleton className="h-3 w-1/3 mb-3" />
                      <Skeleton className="h-1.5 w-full mb-3" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  ))
                : (decks ?? []).slice(0, 4).map((deck, idx) => (
                    <div
                      key={deck.id.toString()}
                      data-ocid={`flashcards.item.${idx + 1}`}
                      className="border border-border rounded-xl p-4 bg-background hover:border-blue-200 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h4
                          className="font-semibold text-sm"
                          style={{ color: "#111827" }}
                        >
                          {deck.title}
                        </h4>
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-600 p-0.5"
                          data-ocid={`flashcards.deck_menu.button.${idx + 1}`}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs mb-3" style={{ color: "#9CA3AF" }}>
                        {Number(deck.cardCount)} cards
                      </p>
                      <div className="w-full h-1.5 rounded-full bg-gray-100 mb-3 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${Math.min(Number(deck.progress), 100)}%`,
                            background:
                              progressColors[idx % progressColors.length],
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        data-ocid={`flashcards.review.button.${idx + 1}`}
                        onClick={() => setReviewDeck(deck)}
                        className="w-full flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
                        style={{ background: "#EBF3FF", color: "#2D7EF7" }}
                      >
                        <PlayCircle className="w-3.5 h-3.5" />
                        Review Now
                      </button>
                    </div>
                  ))}
            </div>
          </div>

          <div>
            <h3
              className="font-semibold text-lg mb-4"
              style={{ color: "#111827" }}
            >
              Recommended Quiz
            </h3>
            <div
              className="border border-border rounded-xl p-6 bg-background flex flex-col"
              data-ocid="quiz.recommended.card"
              style={{ minHeight: "280px" }}
            >
              {quizLoading ? (
                <div className="space-y-4">
                  {QUIZ_SKELETON_KEYS.map((key) => (
                    <div
                      key={key}
                      className="p-3 border border-border rounded-lg"
                    >
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="space-y-3 flex-1">
                    {recommendedQuestions.map((q, idx) => (
                      <div
                        key={q.id.toString()}
                        data-ocid={`quiz.question.item.${idx + 1}`}
                        className="p-3 border border-border rounded-lg hover:border-blue-200 transition-colors"
                      >
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#374151" }}
                        >
                          {idx + 1}. {q.question}
                        </p>
                        <p
                          className="text-xs mt-1"
                          style={{ color: "#9CA3AF" }}
                        >
                          {q.options.length} options
                        </p>
                      </div>
                    ))}
                    {recommendedQuestions.length === 0 && (
                      <p className="text-sm" style={{ color: "#9CA3AF" }}>
                        No questions available
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    data-ocid="quiz.take_quiz.button"
                    onClick={() =>
                      firstSubjectId !== null && onStartQuiz(firstSubjectId)
                    }
                    className="mt-6 w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                    style={{ background: "#2D7EF7" }}
                  >
                    Take Quiz
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {reviewDeck && (
        <FlashcardModal deck={reviewDeck} onClose={() => setReviewDeck(null)} />
      )}
    </section>
  );
}
