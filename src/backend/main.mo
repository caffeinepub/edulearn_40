import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import OutCall "http-outcalls/outcall";
import Migration "migration";
import Order "mo:core/Order";

(with migration = Migration.run)
actor {
  type Subject = {
    id : Nat;
    title : Text;
    description : Text;
    iconName : Text;
    quizCount : Nat;
  };

  type QuizQuestion = {
    id : Nat;
    question : Text;
    options : [Text];
    correctAnswer : Nat;
    explanation : Text;
  };

  type FlashcardDeck = {
    id : Nat;
    title : Text;
    cardCount : Nat;
    progress : Nat;
  };

  type Flashcard = {
    id : Nat;
    question : Text;
    answer : Text;
  };

  type UserProgress = {
    streakDays : Nat;
    completedQuizzes : Nat;
    accuracy : Nat;
    dailyActivity : [Nat];
  };

  type QuizResult = {
    subjectId : Nat;
    score : Nat;
    totalQuestions : Nat;
  };

  module Subject {
    public func compare(subject1 : Subject, subject2 : Subject) : Order.Order {
      Nat.compare(subject1.id, subject2.id);
    };
  };

  type FlashcardAttempt = {
    deckId : Nat;
    cardId : Nat;
    correct : Bool;
  };

  let subjects = Map.empty<Nat, Subject>();
  let quizzes = Map.empty<Nat, [QuizQuestion]>();
  let flashcardDecks = Map.empty<Nat, [FlashcardDeck]>();
  let userProgress = Map.empty<Principal, UserProgress>();
  let flashcards = Map.empty<Nat, [Flashcard]>();

  public query ({ caller }) func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared ({ caller }) func initialize() : async () {
    subjects.add(1, { id = 1; title = "Mathematics"; description = "Master numbers, algebra, geometry, and problem-solving"; iconName = "mathematics"; quizCount = 10 });
    subjects.add(2, { id = 2; title = "Biology"; description = "Explore living organisms, cells, genetics, and ecosystems"; iconName = "biology"; quizCount = 10 });
    subjects.add(3, { id = 3; title = "Chemistry"; description = "Explore matter, reactions, and the building blocks of the universe"; iconName = "flask"; quizCount = 8 });
    subjects.add(4, { id = 4; title = "Physics"; description = "Understand forces, energy, and the laws governing the physical world"; iconName = "atom"; quizCount = 8 });

    quizzes.add(1, [
      { id = 1; question = "What is 2 + 2?"; options = ["3", "4", "5", "6"]; correctAnswer = 1; explanation = "2 + 2 equals 4." },
      { id = 2; question = "What is the square root of 16?"; options = ["2", "4", "6", "8"]; correctAnswer = 1; explanation = "The square root of 16 is 4." },
      { id = 3; question = "What is the value of pi (approximately)?"; options = ["3.14", "2.71", "1.41", "1.73"]; correctAnswer = 0; explanation = "Pi is approximately 3.14159." },
      { id = 4; question = "What is 7 x 8?"; options = ["54", "56", "58", "64"]; correctAnswer = 1; explanation = "7 times 8 equals 56." },
      { id = 5; question = "What is the area of a circle with radius r = 5?"; options = ["25 x pi", "10 x pi", "5 x pi", "50 x pi"]; correctAnswer = 0; explanation = "Area = pi x r^2 = 25 x pi." },
      { id = 6; question = "What is the slope of a horizontal line?"; options = ["1", "Undefined", "0", "-1"]; correctAnswer = 2; explanation = "A horizontal line has a slope of 0." }
    ]);

    quizzes.add(2, [
      { id = 1; question = "What is the powerhouse of the cell?"; options = ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"]; correctAnswer = 1; explanation = "Mitochondria are the powerhouse of the cell." },
      { id = 2; question = "What process do plants use to make food?"; options = ["Respiration", "Photosynthesis", "Digestion", "Fermentation"]; correctAnswer = 1; explanation = "Plants use photosynthesis." },
      { id = 3; question = "What is the basic unit of life?"; options = ["Atom", "Molecule", "Cell", "Organ"]; correctAnswer = 2; explanation = "The cell is the smallest unit of life." },
      { id = 4; question = "What molecule carries genetic information?"; options = ["RNA", "ATP", "DNA", "Protein"]; correctAnswer = 2; explanation = "DNA stores genetic information." },
      { id = 5; question = "Which organ pumps blood throughout the body?"; options = ["Liver", "Lung", "Kidney", "Heart"]; correctAnswer = 3; explanation = "The heart pumps blood." },
      { id = 6; question = "How many chromosomes do humans have?"; options = ["23", "46", "48", "44"]; correctAnswer = 1; explanation = "Humans have 46 chromosomes (23 pairs)." }
    ]);

    quizzes.add(3, [
      { id = 1; question = "What is the chemical symbol for water?"; options = ["CO2", "H2O", "NaCl", "O2"]; correctAnswer = 1; explanation = "Water is H2O." },
      { id = 2; question = "What is the atomic number of carbon?"; options = ["6", "8", "12", "14"]; correctAnswer = 0; explanation = "Carbon has 6 protons." },
      { id = 3; question = "Which subatomic particle has a negative charge?"; options = ["Proton", "Neutron", "Electron", "Photon"]; correctAnswer = 2; explanation = "Electrons carry a negative charge." },
      { id = 4; question = "What type of bond involves sharing of electrons?"; options = ["Ionic bond", "Covalent bond", "Metallic bond", "Hydrogen bond"]; correctAnswer = 1; explanation = "Covalent bonds share electrons." }
    ]);

    quizzes.add(4, [
      { id = 1; question = "What is the unit of force?"; options = ["Joule", "Watt", "Newton", "Pascal"]; correctAnswer = 2; explanation = "Force is measured in Newtons." },
      { id = 2; question = "What is the speed of light in a vacuum?"; options = ["3 x 10^6 m/s", "3 x 10^8 m/s", "3 x 10^10 m/s", "3 x 10^4 m/s"]; correctAnswer = 1; explanation = "Speed of light is 3 x 10^8 m/s." },
      { id = 3; question = "Which law states every action has an equal and opposite reaction?"; options = ["Newton First Law", "Newton Second Law", "Newton Third Law", "Law of Gravity"]; correctAnswer = 2; explanation = "Newton Third Law." },
      { id = 4; question = "What is the formula for kinetic energy?"; options = ["KE = mgh", "KE = 0.5 mv^2", "KE = Fd", "KE = mc^2"]; correctAnswer = 1; explanation = "KE = 0.5 x mass x velocity^2." }
    ]);

    flashcardDecks.add(1, [
      { id = 1; title = "Algebra Basics"; cardCount = 4; progress = 0 },
      { id = 2; title = "Geometry Terms"; cardCount = 4; progress = 0 }
    ]);

    flashcardDecks.add(2, [
      { id = 3; title = "Cell Structure"; cardCount = 4; progress = 0 },
      { id = 4; title = "Human Anatomy"; cardCount = 4; progress = 0 }
    ]);

    flashcardDecks.add(3, [
      { id = 5; title = "Periodic Table"; cardCount = 4; progress = 0 },
      { id = 6; title = "Chemical Reactions"; cardCount = 4; progress = 0 }
    ]);

    flashcardDecks.add(4, [
      { id = 7; title = "Laws of Motion"; cardCount = 4; progress = 0 },
      { id = 8; title = "Electricity and Magnetism"; cardCount = 4; progress = 0 }
    ]);

    flashcards.add(1, [
      { id = 1; question = "What is a variable?"; answer = "A symbol used to represent an unknown number." },
      { id = 2; question = "What is an equation?"; answer = "A statement showing two expressions are equal." },
      { id = 3; question = "What is the quadratic formula?"; answer = "x = (-b +/- sqrt(b^2 - 4ac)) / 2a" },
      { id = 4; question = "What is PEMDAS?"; answer = "Order of operations: Parentheses, Exponents, Multiplication/Division, Addition/Subtraction." }
    ]);

    flashcards.add(2, [
      { id = 5; question = "What is the Pythagorean theorem?"; answer = "a^2 + b^2 = c^2, where c is the hypotenuse." },
      { id = 6; question = "Sum of angles in a triangle?"; answer = "180 degrees." },
      { id = 7; question = "Area of a rectangle?"; answer = "Length x Width." },
      { id = 8; question = "What is a right angle?"; answer = "An angle of exactly 90 degrees." }
    ]);

    flashcards.add(3, [
      { id = 9; question = "What is the function of the nucleus?"; answer = "Controls cell activity and contains DNA." },
      { id = 10; question = "What does the cell membrane do?"; answer = "Regulates what enters and leaves the cell." },
      { id = 11; question = "What do ribosomes do?"; answer = "Synthesize proteins by translating mRNA." },
      { id = 12; question = "What is the mitochondria?"; answer = "The organelle that produces ATP energy for the cell." }
    ]);

    flashcards.add(4, [
      { id = 13; question = "What is the largest organ?"; answer = "The skin." },
      { id = 14; question = "How many bones in the adult body?"; answer = "206 bones." },
      { id = 15; question = "What does the small intestine do?"; answer = "Absorbs nutrients from digested food." },
      { id = 16; question = "Function of red blood cells?"; answer = "Carry oxygen using hemoglobin." }
    ]);

    flashcards.add(5, [
      { id = 17; question = "Symbol for Gold?"; answer = "Au (from Latin Aurum)." },
      { id = 18; question = "Symbol for Iron?"; answer = "Fe (from Latin Ferrum)." },
      { id = 19; question = "Most abundant element in the universe?"; answer = "Hydrogen." },
      { id = 20; question = "How many elements in the periodic table?"; answer = "118." }
    ]);

    flashcards.add(7, [
      { id = 21; question = "Newton First Law?"; answer = "An object stays at rest or in motion unless acted on by an external force." },
      { id = 22; question = "Newton Second Law?"; answer = "F = ma (Force = mass x acceleration)." },
      { id = 23; question = "Newton Third Law?"; answer = "Every action has an equal and opposite reaction." },
      { id = 24; question = "Unit of acceleration?"; answer = "Meters per second squared (m/s^2)." }
    ]);
  };

  public query ({ caller }) func getSubjects() : async [Subject] {
    subjects.values().toArray().sort();
  };

  public query ({ caller }) func getQuizQuestions(subjectId : Nat) : async [QuizQuestion] {
    switch (quizzes.get(subjectId)) {
      case (null) { Runtime.trap("Quiz questions not found for subject") };
      case (?questions) { questions };
    };
  };

  public query ({ caller }) func getFlashcardDecks(subjectId : Nat) : async [FlashcardDeck] {
    switch (flashcardDecks.get(subjectId)) {
      case (null) { Runtime.trap("Flashcard decks not found for subject") };
      case (?decks) { decks };
    };
  };

  public query ({ caller }) func getFlashcards(deckId : Nat) : async [Flashcard] {
    switch (flashcards.get(deckId)) {
      case (null) { Runtime.trap("Flashcards not found for deck") };
      case (?cards) { cards };
    };
  };

  public shared ({ caller }) func submitQuizResult(result : QuizResult) : async Bool {
    let progress = userProgress.get(caller);
    let newProgress = switch (progress) {
      case (null) { { streakDays = 1; completedQuizzes = 1; accuracy = 0; dailyActivity = [1] } };
      case (?existing) { { existing with streakDays = existing.streakDays + 1; completedQuizzes = existing.completedQuizzes + 1 } };
    };
    userProgress.add(caller, newProgress);
    true;
  };

  public shared ({ caller }) func startFlashcardAttempt(deckId : Nat, cardId : Nat) : async Bool {
    switch (flashcardDecks.get(deckId)) {
      case (null) { Runtime.trap("Flashcard deck not found") };
      case (_) { true };
    };
  };

  public query ({ caller }) func getUserProgress() : async ?UserProgress {
    userProgress.get(caller);
  };

  let openAIApiKey = "YOUR_OPENAI_API_KEY";
  public shared ({ caller }) func askAITutor(question : Text, subject : Text, context : Text) : async Text {
    let systemPrompt = "You are an expert educational tutor. Answer questions clearly and concisely for students.\n\nSubject: " # subject # "\nContext: " # context;
    let userPrompt = "Question: " # question;
    let payload = "{ \"model\": \"gpt-3.5-turbo\", \"messages\": [{\"role\": \"system\", \"content\": \"" # systemPrompt # "\"}, {\"role\": \"user\", \"content\": \"" # userPrompt # "\"}], \"temperature\": 0.7 }";
    let headers : [OutCall.Header] = [
      { name = "Content-Type"; value = "application/json" },
      { name = "Authorization"; value = "Bearer " # openAIApiKey },
    ];
    try {
      let response = await OutCall.httpPostRequest(
        "https://api.openai.com/v1/chat/completions",
        headers,
        payload,
        transform,
      );
      response;
    } catch (err) {
      "Sorry, our AI Tutor is currently unavailable. Please try again later or rephrase your question.";
    };
  };
};
