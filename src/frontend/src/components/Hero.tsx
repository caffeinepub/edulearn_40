import { Zap } from "lucide-react";

interface HeroProps {
  onExplore: () => void;
  onQuiz: () => void;
}

export default function Hero({ onExplore, onQuiz }: HeroProps) {
  return (
    <section
      id="home"
      className="relative pt-16 min-h-[580px] flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #EBF3FF 0%, #F3F6FA 50%, #FFF6F0 100%)",
      }}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Educational background pattern</title>
        <defs>
          <pattern
            id="edu-pattern"
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="10"
              y="20"
              width="30"
              height="22"
              rx="2"
              stroke="#2D7EF7"
              strokeWidth="1.5"
              fill="none"
            />
            <line
              x1="25"
              y1="20"
              x2="25"
              y2="42"
              stroke="#2D7EF7"
              strokeWidth="1"
            />
            <polygon
              points="85,15 87,21 93,21 88,25 90,31 85,27 80,31 82,25 77,21 83,21"
              stroke="#F26A3D"
              strokeWidth="1"
              fill="none"
            />
            <circle
              cx="30"
              cy="80"
              r="4"
              stroke="#2D7EF7"
              strokeWidth="1"
              fill="none"
            />
            <ellipse
              cx="30"
              cy="80"
              rx="14"
              ry="5"
              stroke="#2D7EF7"
              strokeWidth="1"
              fill="none"
            />
            <ellipse
              cx="30"
              cy="80"
              rx="14"
              ry="5"
              stroke="#2D7EF7"
              strokeWidth="1"
              fill="none"
              transform="rotate(60 30 80)"
            />
            <ellipse
              cx="30"
              cy="80"
              rx="14"
              ry="5"
              stroke="#2D7EF7"
              strokeWidth="1"
              fill="none"
              transform="rotate(120 30 80)"
            />
            <line
              x1="80"
              y1="60"
              x2="100"
              y2="80"
              stroke="#F26A3D"
              strokeWidth="1.5"
            />
            <line
              x1="78"
              y1="62"
              x2="98"
              y2="82"
              stroke="#F26A3D"
              strokeWidth="1"
            />
            <circle
              cx="90"
              cy="95"
              r="6"
              stroke="#2D7EF7"
              strokeWidth="1"
              fill="none"
            />
            <line
              x1="87"
              y1="101"
              x2="93"
              y2="101"
              stroke="#2D7EF7"
              strokeWidth="1"
            />
            <line
              x1="88"
              y1="104"
              x2="92"
              y2="104"
              stroke="#2D7EF7"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#edu-pattern)" />
      </svg>
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center py-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-blue-100 text-sm font-medium text-blue-700 mb-6 shadow-xs">
          <Zap className="w-4 h-4" />
          Interactive Learning Platform
        </div>
        <h1
          className="text-5xl sm:text-6xl font-bold mb-6 leading-tight"
          style={{ color: "#111827" }}
        >
          Learn. <span style={{ color: "#2D7EF7" }}>Practice.</span>{" "}
          <span style={{ color: "#F26A3D" }}>Excel.</span>
        </h1>
        <p className="text-lg mb-10" style={{ color: "#4B5563" }}>
          Master any subject with adaptive quizzes, smart flashcards, and
          personalized progress tracking designed to accelerate your learning
          journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            data-ocid="hero.explore_subjects.button"
            onClick={onExplore}
            className="px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 active:scale-95 shadow-md"
            style={{ background: "#2D7EF7" }}
          >
            Explore Subjects
          </button>
          <button
            type="button"
            data-ocid="hero.take_quiz.button"
            onClick={onQuiz}
            className="px-8 py-3.5 rounded-xl font-semibold border-2 transition-all hover:bg-blue-50 active:scale-95"
            style={{ borderColor: "#2D7EF7", color: "#2D7EF7" }}
          >
            Take a Quick Quiz
          </button>
        </div>
      </div>
    </section>
  );
}
