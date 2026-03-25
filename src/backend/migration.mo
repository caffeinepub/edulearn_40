import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

module {
  // Subject type
  type Subject = {
    id : Nat;
    title : Text;
    description : Text;
    iconName : Text;
    quizCount : Nat;
  };

  // Quiz question type
  type QuizQuestion = {
    id : Nat;
    question : Text;
    options : [Text];
    correctAnswer : Nat;
    explanation : Text;
  };

  // Flashcard deck type
  type FlashcardDeck = {
    id : Nat;
    title : Text;
    cardCount : Nat;
    progress : Nat;
  };

  // Flashcard type
  type Flashcard = {
    id : Nat;
    question : Text;
    answer : Text;
  };

  // User progress type
  type UserProgress = {
    streakDays : Nat;
    completedQuizzes : Nat;
    accuracy : Nat;
    dailyActivity : [Nat];
  };

  type OldActor = {
    subjects : Map.Map<Nat, Subject>;
    quizzes : Map.Map<Nat, [QuizQuestion]>;
    flashcardDecks : Map.Map<Nat, [FlashcardDeck]>;
    userProgress : Map.Map<Principal.Principal, UserProgress>;
    flashcards : Map.Map<Nat, [Flashcard]>;
  };

  type NewActor = {
    subjects : Map.Map<Nat, Subject>;
    quizzes : Map.Map<Nat, [QuizQuestion]>;
    flashcardDecks : Map.Map<Nat, [FlashcardDeck]>;
    userProgress : Map.Map<Principal.Principal, UserProgress>;
    flashcards : Map.Map<Nat, [Flashcard]>;
    openAIApiKey : Text;
  };

  public func run(old : OldActor) : NewActor {
    { // Keep existing state and add new API key field
      old with
      openAIApiKey = "YOUR_OPENAI_API_KEY"
    };
  };
};
