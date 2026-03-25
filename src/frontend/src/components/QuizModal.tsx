import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, Trophy, XCircle } from "lucide-react";
import { useState } from "react";
import { useQuizQuestions, useSubmitQuizResult } from "../hooks/useQueries";

const OPTION_SKELETON_KEYS = ["sk-opt-1", "sk-opt-2", "sk-opt-3", "sk-opt-4"];

interface Props {
  subjectId: bigint;
  onClose: () => void;
}

export default function QuizModal({ subjectId, onClose }: Props) {
  const { data: questions, isLoading } = useQuizQuestions(subjectId);
  const submitResult = useSubmitQuizResult();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions?.[currentIdx];
  const total = questions?.length ?? 0;

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (q && BigInt(idx) === q.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 >= total) {
      submitResult.mutate({
        subjectId,
        score: BigInt(score),
        totalQuestions: BigInt(total),
      });
      setFinished(true);
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg" data-ocid="quiz.modal">
        <DialogHeader>
          <DialogTitle>Quiz</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4" data-ocid="quiz.loading_state">
            <Skeleton className="h-5 w-full" />
            {OPTION_SKELETON_KEYS.map((key) => (
              <Skeleton key={key} className="h-12 w-full rounded-xl" />
            ))}
          </div>
        ) : finished ? (
          <div className="text-center py-8" data-ocid="quiz.success_state">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: "#EBF3FF" }}
            >
              <Trophy className="w-8 h-8" style={{ color: "#2D7EF7" }} />
            </div>
            <h3
              className="text-2xl font-bold mb-2"
              style={{ color: "#111827" }}
            >
              Quiz Complete!
            </h3>
            <p className="text-lg mb-6" style={{ color: "#4B5563" }}>
              You scored{" "}
              <span className="font-bold" style={{ color: "#2D7EF7" }}>
                {score}
              </span>{" "}
              / {total}
            </p>
            <Button
              data-ocid="quiz.close.button"
              onClick={onClose}
              className="px-8 py-2"
              style={{ background: "#2D7EF7" }}
            >
              Close
            </Button>
          </div>
        ) : q ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs font-medium"
                style={{ color: "#9CA3AF" }}
              >
                Question {currentIdx + 1} of {total}
              </span>
              <div className="w-24 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${((currentIdx + 1) / total) * 100}%`,
                    background: "#2D7EF7",
                  }}
                />
              </div>
            </div>
            <p className="font-semibold text-base" style={{ color: "#111827" }}>
              {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((option, idx) => {
                const isCorrect = BigInt(idx) === q.correctAnswer;
                const isSelected = selected === idx;
                let bg = "#F9FAFB";
                let border = "#E5E7EB";
                let color = "#374151";
                if (answered) {
                  if (isCorrect) {
                    bg = "#EBFFF4";
                    border = "#10B981";
                    color = "#065F46";
                  } else if (isSelected) {
                    bg = "#FFF0EB";
                    border = "#F26A3D";
                    color = "#9A3412";
                  }
                }
                return (
                  <button
                    type="button"
                    key={option}
                    data-ocid={`quiz.option.button.${idx + 1}`}
                    onClick={() => handleSelect(idx)}
                    disabled={answered}
                    className="w-full text-left px-4 py-3 rounded-xl border-2 transition-all font-medium text-sm flex items-center justify-between"
                    style={{ background: bg, borderColor: border, color }}
                  >
                    <span>{option}</span>
                    {answered && isCorrect && (
                      <CheckCircle2
                        className="w-4 h-4"
                        style={{ color: "#10B981" }}
                      />
                    )}
                    {answered && isSelected && !isCorrect && (
                      <XCircle
                        className="w-4 h-4"
                        style={{ color: "#F26A3D" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div className="p-3 rounded-xl" style={{ background: "#F0F9FF" }}>
                <p className="text-xs" style={{ color: "#374151" }}>
                  <strong>Explanation:</strong> {q.explanation}
                </p>
              </div>
            )}
            {answered && (
              <Button
                data-ocid="quiz.next.button"
                onClick={handleNext}
                className="w-full"
                style={{ background: "#2D7EF7" }}
              >
                {currentIdx + 1 >= total ? "Finish Quiz" : "Next Question"}
              </Button>
            )}
          </div>
        ) : (
          <p
            className="text-sm py-8 text-center"
            style={{ color: "#9CA3AF" }}
            data-ocid="quiz.empty_state"
          >
            No questions available for this subject.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
