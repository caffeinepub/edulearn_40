import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, Flame, Target } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useUserProgress } from "../hooks/useQueries";

export default function ProgressOverview() {
  const { data: progress, isLoading } = useUserProgress();

  const chartData = (progress?.dailyActivity ?? []).map((count, idx) => ({
    day: `Day ${idx + 1}`,
    count: Number(count),
  }));

  const streak = Number(progress?.streakDays ?? 0);
  const completed = Number(progress?.completedQuizzes ?? 0);
  const accuracy = Number(progress?.accuracy ?? 0);

  return (
    <section
      id="progress"
      className="py-16 px-4"
      style={{ background: "#F3F6FA" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#111827" }}>
            Progress Overview
          </h2>
          <p className="text-base" style={{ color: "#4B5563" }}>
            Track your learning journey and celebrate milestones.
          </p>
        </div>
        <div
          className="bg-white rounded-2xl shadow-card border border-border p-6"
          data-ocid="progress.card"
        >
          {isLoading ? (
            <>
              <Skeleton className="h-48 w-full mb-6" />
              <div className="flex gap-8">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-32" />
              </div>
            </>
          ) : (
            <>
              <div className="h-52 w-full mb-6" data-ocid="progress.chart">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#2D7EF7"
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor="#2D7EF7"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 11, fill: "#9CA3AF" }}
                      tickLine={false}
                      axisLine={false}
                      interval={4}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "#9CA3AF" }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #E5E7EB",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#2D7EF7"
                      strokeWidth={2}
                      fill="url(#areaGrad)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-6">
                <div
                  className="flex items-center gap-3"
                  data-ocid="progress.streak.panel"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "#FFF0EB" }}
                  >
                    <Flame className="w-5 h-5" style={{ color: "#F26A3D" }} />
                  </div>
                  <div>
                    <p
                      className="font-bold text-xl"
                      style={{ color: "#111827" }}
                    >
                      {streak} Days
                    </p>
                    <p className="text-xs" style={{ color: "#9CA3AF" }}>
                      Streak
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center gap-3"
                  data-ocid="progress.completed.panel"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "#EBF3FF" }}
                  >
                    <CheckCircle2
                      className="w-5 h-5"
                      style={{ color: "#2D7EF7" }}
                    />
                  </div>
                  <div>
                    <p
                      className="font-bold text-xl"
                      style={{ color: "#111827" }}
                    >
                      {completed}
                    </p>
                    <p className="text-xs" style={{ color: "#9CA3AF" }}>
                      Completed Quizzes
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center gap-3"
                  data-ocid="progress.accuracy.panel"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "#EBFFF4" }}
                  >
                    <Target className="w-5 h-5" style={{ color: "#10B981" }} />
                  </div>
                  <div>
                    <p
                      className="font-bold text-xl"
                      style={{ color: "#111827" }}
                    >
                      {accuracy}%
                    </p>
                    <p className="text-xs" style={{ color: "#9CA3AF" }}>
                      Accuracy
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
