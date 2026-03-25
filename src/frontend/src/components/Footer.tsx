import { GraduationCap } from "lucide-react";
import { SiFacebook, SiGithub, SiX } from "react-icons/si";

const navLinks = ["Subjects", "About", "Contact", "FAQ", "Terms", "Privacy"];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="pt-12 pb-6 px-4"
      style={{
        background: "linear-gradient(135deg, #0B2746 0%, #163A5F 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-orange-400 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-xl">EduLearn</span>
          </div>
          <nav
            className="flex flex-wrap gap-x-6 gap-y-2"
            aria-label="Footer navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href="/"
                className="text-blue-200 hover:text-white text-sm transition-colors"
                data-ocid={`footer.${link.toLowerCase()}.link`}
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white transition-colors"
              data-ocid="footer.twitter.link"
            >
              <SiX size={18} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white transition-colors"
              data-ocid="footer.github.link"
            >
              <SiGithub size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white transition-colors"
              data-ocid="footer.facebook.link"
            >
              <SiFacebook size={18} />
            </a>
          </div>
        </div>
        <div className="border-t border-blue-800 pt-6 text-center">
          <p className="text-xs text-blue-300">
            © {year}. Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              className="hover:text-white underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
