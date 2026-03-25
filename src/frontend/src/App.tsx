import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import FeaturedSubjects from "./components/FeaturedSubjects";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import InteractiveLearning from "./components/InteractiveLearning";
import Navbar from "./components/Navbar";
import ProgressOverview from "./components/ProgressOverview";
import QuizModal from "./components/QuizModal";

export default function App() {
  const [quizSubjectId, setQuizSubjectId] = useState<bigint | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <Navbar />
      <main>
        <Hero
          onExplore={() => {
            document
              .getElementById("subjects")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          onQuiz={() => setQuizSubjectId(BigInt(1))}
        />
        <FeaturedSubjects onViewQuizzes={setQuizSubjectId} />
        <InteractiveLearning onStartQuiz={setQuizSubjectId} />
        <ProgressOverview />
      </main>
      <Footer />
      {quizSubjectId !== null && (
        <QuizModal
          subjectId={quizSubjectId}
          onClose={() => setQuizSubjectId(null)}
        />
      )}
    </div>
  );
}
