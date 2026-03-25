import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useActor } from "../hooks/useActor";

const SUBJECTS = ["Math", "Biology", "Chemistry", "Physics"];
const TYPING_DOTS = ["dot-1", "dot-2", "dot-3"];
const TYPING_DELAYS = [0, 0.15, 0.3];

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
}

export interface AIChatWidgetHandle {
  openWithQuestion: (question: string, subject?: string) => void;
}

const AIChatWidget = forwardRef<AIChatWidgetHandle>((_, ref) => {
  const { actor } = useActor();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      text: "Hi! I'm your AI Tutor. Ask me anything about your subjects!",
    },
  ]);
  const [input, setInput] = useState("");
  const [subject, setSubject] = useState("Math");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    openWithQuestion: (question: string, subj?: string) => {
      if (subj) setSubject(subj);
      setInput(question);
      setOpen(true);
    },
  }));

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on messages/open changes intentionally
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading || !actor) return;
    setInput("");
    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    try {
      const response = await actor.askAITutor(text, subject, "");
      setMessages((prev) => [
        ...prev,
        { id: `ai-${Date.now()}`, role: "ai", text: response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "ai",
          text: "Sorry, I couldn't connect right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            data-ocid="ai_tutor.open_modal_button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl shadow-xl text-white text-sm font-semibold"
            style={{
              background: "linear-gradient(135deg, #2D7EF7 0%, #1A5DC4 100%)",
              boxShadow: "0 8px 32px rgba(45,126,247,0.35)",
            }}
          >
            <Sparkles className="w-4 h-4" />
            AI Tutor
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            data-ocid="ai_tutor.modal"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl overflow-hidden"
            style={{
              width: 380,
              height: 520,
              boxShadow:
                "0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(45,126,247,0.12)",
              background: "#fff",
              border: "1px solid #E5E7EB",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #2D7EF7 0%, #1A5DC4 100%)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">
                    AI Tutor
                  </p>
                  <p className="text-blue-100 text-xs">Powered by AI</p>
                </div>
              </div>
              <button
                type="button"
                data-ocid="ai_tutor.close_button"
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Subject Selector */}
            <div
              className="px-3 py-2 border-b flex-shrink-0"
              style={{ borderColor: "#F3F4F6" }}
            >
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger
                  data-ocid="ai_tutor.select"
                  className="h-8 text-xs rounded-lg border-0 bg-gray-50"
                >
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map((s) => (
                    <SelectItem key={s} value={s} className="text-xs">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 px-3 py-3">
              <div className="space-y-3">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "ai" && (
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
                        style={{ background: "#EBF3FF" }}
                      >
                        <Bot className="w-3 h-3" style={{ color: "#2D7EF7" }} />
                      </div>
                    )}
                    <div
                      className="max-w-[76%] px-3 py-2 rounded-2xl text-xs leading-relaxed"
                      style={
                        msg.role === "user"
                          ? {
                              background: "#2D7EF7",
                              color: "#fff",
                              borderBottomRightRadius: 4,
                            }
                          : {
                              background: "#F3F4F6",
                              color: "#1F2937",
                              borderBottomLeftRadius: 4,
                            }
                      }
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <motion.div
                    data-ocid="ai_tutor.loading_state"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start items-end gap-2"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "#EBF3FF" }}
                    >
                      <Bot className="w-3 h-3" style={{ color: "#2D7EF7" }} />
                    </div>
                    <div
                      className="px-3 py-2 rounded-2xl"
                      style={{
                        background: "#F3F4F6",
                        borderBottomLeftRadius: 4,
                      }}
                    >
                      <div className="flex gap-1 items-center">
                        {TYPING_DOTS.map((key, i) => (
                          <motion.span
                            key={key}
                            className="block w-1.5 h-1.5 rounded-full"
                            style={{ background: "#9CA3AF" }}
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              repeat: Number.POSITIVE_INFINITY,
                              duration: 0.7,
                              delay: TYPING_DELAYS[i],
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={bottomRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div
              className="px-3 py-3 flex gap-2 items-center flex-shrink-0 border-t"
              style={{ borderColor: "#F3F4F6" }}
            >
              <Input
                data-ocid="ai_tutor.input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask about ${subject}...`}
                className="flex-1 text-xs h-9 rounded-xl border-gray-200 focus-visible:ring-blue-400"
                disabled={loading}
              />
              <Button
                data-ocid="ai_tutor.submit_button"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                size="sm"
                className="h-9 w-9 p-0 rounded-xl flex-shrink-0"
                style={{ background: "#2D7EF7" }}
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

AIChatWidget.displayName = "AIChatWidget";
export default AIChatWidget;
