import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[#f4f1ea]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-[1480px] items-center justify-between px-4 sm:px-7">
        <Link href="/" className="text-sm font-black uppercase tracking-[0.08em] text-black">
          Huraib Jan
        </Link>
        <div className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[0.12em] text-black/70 md:flex">
          <a href="/#about" className="transition hover:text-black">Profile</a>
          <a href="/#skills" className="transition hover:text-black">Stack</a>
          <Link href="/projects" className="transition hover:text-black">Work</Link>
          <a href="/#contact" className="transition hover:text-black">Contact</a>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/huraibjan"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/20 bg-black text-white transition hover:bg-black/80"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="mailto:huraibjan@example.com"
            className="hidden items-center gap-2 rounded-full border border-black/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-black transition hover:bg-black hover:text-white sm:inline-flex"
            aria-label="Email Huraib Jan"
          >
            Hire Me <ArrowUpRight size={15} />
          </a>
        </div>
      </nav>
    </header>
  );
}
