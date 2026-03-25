import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { QuizResult } from "../backend";
import { useActor } from "./useActor";

export function useSubjects() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSubjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFlashcardDecks(subjectId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["flashcardDecks", subjectId?.toString()],
    queryFn: async () => {
      if (!actor || subjectId === null) return [];
      return actor.getFlashcardDecks(subjectId);
    },
    enabled: !!actor && !isFetching && subjectId !== null,
  });
}

export function useFlashcards(deckId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["flashcards", deckId?.toString()],
    queryFn: async () => {
      if (!actor || deckId === null) return [];
      return actor.getFlashcards(deckId);
    },
    enabled: !!actor && !isFetching && deckId !== null,
  });
}

export function useQuizQuestions(subjectId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["quizQuestions", subjectId?.toString()],
    queryFn: async () => {
      if (!actor || subjectId === null) return [];
      return actor.getQuizQuestions(subjectId);
    },
    enabled: !!actor && !isFetching && subjectId !== null,
  });
}

export function useUserProgress() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["userProgress"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getUserProgress();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitQuizResult() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (result: QuizResult) => {
      if (!actor) throw new Error("No actor");
      return actor.submitQuizResult(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProgress"] });
    },
  });
}
