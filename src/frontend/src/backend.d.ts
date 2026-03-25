import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface QuizQuestion {
    id: bigint;
    question: string;
    explanation: string;
    correctAnswer: bigint;
    options: Array<string>;
}
export interface FlashcardDeck {
    id: bigint;
    title: string;
    progress: bigint;
    cardCount: bigint;
}
export interface Flashcard {
    id: bigint;
    question: string;
    answer: string;
}
export interface QuizResult {
    score: bigint;
    totalQuestions: bigint;
    subjectId: bigint;
}
export interface Subject {
    id: bigint;
    title: string;
    description: string;
    iconName: string;
    quizCount: bigint;
}
export interface UserProgress {
    completedQuizzes: bigint;
    streakDays: bigint;
    dailyActivity: Array<bigint>;
    accuracy: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface backendInterface {
    askAITutor(question: string, subject: string, context: string): Promise<string>;
    getFlashcardDecks(subjectId: bigint): Promise<Array<FlashcardDeck>>;
    getFlashcards(deckId: bigint): Promise<Array<Flashcard>>;
    getQuizQuestions(subjectId: bigint): Promise<Array<QuizQuestion>>;
    getSubjects(): Promise<Array<Subject>>;
    getUserProgress(): Promise<UserProgress | null>;
    initialize(): Promise<void>;
    startFlashcardAttempt(deckId: bigint, cardId: bigint): Promise<boolean>;
    submitQuizResult(result: QuizResult): Promise<boolean>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
