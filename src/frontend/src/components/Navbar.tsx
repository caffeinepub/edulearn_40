import { GraduationCap } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Subjects", href: "#subjects" },
  { label: "Flashcards", href: "#flashcards" },
  { label: "Progress", href: "#progress" },
];

export default function Navbar() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 shadow-md"
      style={{
        background: "linear-gradient(135deg, #0B2746 0%, #163A5F 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-orange-400 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              EduLearn
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                onClick={() => scrollTo(link.href)}
                className="text-blue-100 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            data-ocid="nav.start_learning.button"
            onClick={() => scrollTo("#subjects")}
            className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(135deg, #F26A3D, #e85a2d)" }}
          >
            Start Learning
          </button>
        </div>
      </div>
    </nav>
  );
}
