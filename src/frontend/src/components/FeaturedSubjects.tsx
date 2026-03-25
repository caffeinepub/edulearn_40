import { Skeleton } from "@/components/ui/skeleton";
import {
  Atom,
  BookOpen,
  Brain,
  Calculator,
  Code2,
  FlaskConical,
  Globe,
  History,
  Landmark,
  Languages,
  type LucideProps,
  Microscope,
  Music,
} from "lucide-react";
import { useSubjects } from "../hooks/useQueries";

type IconComponent = React.ComponentType<LucideProps>;

const iconMap: Record<string, IconComponent> = {
  calculator: Calculator,
  flask: FlaskConical,
  book: BookOpen,
  language: Languages,
  languages: Languages,
  atom: Atom,
  globe: Globe,
  music: Music,
  code: Code2,
  history: History,
  landmark: Landmark,
  brain: Brain,
  microscope: Microscope,
  biology: Microscope,
  mathematics: Calculator,
  science: Atom,
};

const badgeColors = [
  { bg: "#EBF3FF", color: "#2D7EF7" },
  { bg: "#FFF0EB", color: "#F26A3D" },
  { bg: "#EBFFF4", color: "#10B981" },
  { bg: "#F5EBFF", color: "#8B5CF6" },
];

const SKELETON_KEYS = ["sk-subj-1", "sk-subj-2", "sk-subj-3", "sk-subj-4"];

interface Props {
  onViewQuizzes: (subjectId: bigint) => void;
}

export default function FeaturedSubjects({ onViewQuizzes }: Props) {
  const { data: subjects, isLoading } = useSubjects();

  return (
    <section
      id="subjects"
      className="py-16 px-4"
      style={{ background: "#F3F6FA" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#111827" }}>
            Featured Subjects
          </h2>
          <p className="text-base" style={{ color: "#4B5563" }}>
            Choose from our curated collection of subjects and start mastering
            them today.
          </p>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          data-ocid="subjects.list"
        >
          {isLoading
            ? SKELETON_KEYS.map((key, i) => (
                <div
                  key={key}
                  className="bg-white rounded-xl p-6 shadow-card border border-border"
                  data-ocid={`subjects.item.${i + 1}`}
                >
                  <Skeleton className="w-12 h-12 rounded-xl mb-4" />
                  <Skeleton className="h-5 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-6" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ))
            : (subjects ?? []).slice(0, 4).map((subject, idx) => {
                const iconKey = subject.iconName.toLowerCase();
                const IconComp: IconComponent = iconMap[iconKey] ?? BookOpen;
                const badge = badgeColors[idx % badgeColors.length];
                return (
                  <div
                    key={subject.id.toString()}
                    data-ocid={`subjects.item.${idx + 1}`}
                    className="bg-white rounded-xl p-6 shadow-card border border-border hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: badge.bg }}
                    >
                      <IconComp className="w-6 h-6" color={badge.color} />
                    </div>
                    <h3
                      className="font-semibold text-lg mb-1"
                      style={{ color: "#111827" }}
                    >
                      {subject.title}
                    </h3>
                    <p
                      className="text-sm mb-4 flex-1"
                      style={{ color: "#6B7280" }}
                    >
                      {subject.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span
                        className="text-xs font-medium"
                        style={{ color: "#9CA3AF" }}
                      >
                        {Number(subject.quizCount)} quizzes
                      </span>
                      <button
                        type="button"
                        data-ocid={`subjects.view_quizzes.button.${idx + 1}`}
                        onClick={() => onViewQuizzes(subject.id)}
                        className="text-sm font-semibold transition-colors hover:underline"
                        style={{ color: "#2D7EF7" }}
                      >
                        View Quizzes →
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
