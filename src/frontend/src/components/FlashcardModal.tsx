import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useState } from "react";
import type { FlashcardDeck } from "../backend";
import { useFlashcards } from "../hooks/useQueries";

interface Props {
  deck: FlashcardDeck;
  onClose: () => void;
}

export default function FlashcardModal({ deck, onClose }: Props) {
  const { data: cards, isLoading } = useFlashcards(deck.id);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = cards?.[currentIdx];
  const total = cards?.length ?? 0;

  const goNext = () => {
    setCurrentIdx((i) => Math.min(i + 1, total - 1));
    setFlipped(false);
  };

  const goPrev = () => {
    setCurrentIdx((i) => Math.max(i - 1, 0));
    setFlipped(false);
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md" data-ocid="flashcard.modal">
        <DialogHeader>
          <DialogTitle>{deck.title}</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div data-ocid="flashcard.loading_state">
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
        ) : card ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-medium"
                style={{ color: "#9CA3AF" }}
              >
                {currentIdx + 1} / {total}
              </span>
              <span className="text-xs" style={{ color: "#9CA3AF" }}>
                Click card to flip
              </span>
            </div>
            <button
              type="button"
              className="card-flip-container cursor-pointer w-full text-left"
              style={{ height: "200px" }}
              onClick={() => setFlipped((f) => !f)}
              data-ocid="flashcard.canvas_target"
            >
              <div className={`card-flip ${flipped ? "flipped" : ""}`}>
                <div
                  className="card-face rounded-2xl flex flex-col items-center justify-center p-6 border-2"
                  style={{
                    background: "linear-gradient(135deg, #EBF3FF, #F0F9FF)",
                    borderColor: "#BFDBFE",
                  }}
                >
                  <span
                    className="text-xs font-semibold uppercase tracking-wider mb-3"
                    style={{ color: "#93C5FD" }}
                  >
                    Question
                  </span>
                  <p
                    className="text-center font-semibold text-base"
                    style={{ color: "#1E3A5F" }}
                  >
                    {card.question}
                  </p>
                </div>
                <div
                  className="card-face card-face-back rounded-2xl flex flex-col items-center justify-center p-6 border-2"
                  style={{
                    background: "linear-gradient(135deg, #EBFFF4, #F0FFF8)",
                    borderColor: "#6EE7B7",
                  }}
                >
                  <span
                    className="text-xs font-semibold uppercase tracking-wider mb-3"
                    style={{ color: "#6EE7B7" }}
                  >
                    Answer
                  </span>
                  <p
                    className="text-center font-semibold text-base"
                    style={{ color: "#064E3B" }}
                  >
                    {card.answer}
                  </p>
                </div>
              </div>
            </button>
            <div className="flex items-center justify-between">
              <Button
                data-ocid="flashcard.prev.button"
                variant="outline"
                size="icon"
                onClick={goPrev}
                disabled={currentIdx === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <button
                type="button"
                data-ocid="flashcard.flip.button"
                onClick={() => setFlipped((f) => !f)}
                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:bg-gray-100"
                style={{ color: "#6B7280" }}
              >
                <RotateCcw className="w-4 h-4" />
                Flip
              </button>
              <Button
                data-ocid="flashcard.next.button"
                variant="outline"
                size="icon"
                onClick={goNext}
                disabled={currentIdx === total - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <p
            className="text-sm py-8 text-center"
            style={{ color: "#9CA3AF" }}
            data-ocid="flashcard.empty_state"
          >
            No flashcards available for this deck.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
