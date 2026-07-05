export function Footer() {
  return (
    <footer className="border-t border-black/20 bg-[#f4f1ea] px-4 py-8 text-xs font-bold uppercase tracking-[0.12em] text-black/60 sm:px-7">
      <div className="mx-auto flex max-w-[1480px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Huraib Jan. AI systems and full-stack products.</p>
        <div className="flex gap-5 text-black">
          <a href="https://github.com/huraibjan" className="hover:text-black/60" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:huraibjan@example.com" className="hover:text-black/60">Email</a>
          <a href="/projects" className="hover:text-black/60">Work</a>
        </div>
      </div>
    </footer>
  );
}
