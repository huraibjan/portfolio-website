import { FadeIn } from "@/components/AnimatedShell";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export const metadata = {
  title: "Projects | Huraib Jan",
  description: "AI systems, automation platforms, mobile apps, cybersecurity tools, and full-stack projects by Huraib Jan.",
};

export default function ProjectsPage() {
  const projectTypes = ["AI Systems", "Voice Automation", "Security AI", "Mobile Apps", "Dashboards", "Commerce"];

  return (
    <main className="projects-page relative z-10 min-h-screen">
      <div className="projects-bg-bits" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <Nav />
      <section className="projects-index-shell px-4 pb-20 pt-28 sm:px-7">
        <div className="mx-auto max-w-[1480px]">
          <FadeIn>
            <div className="projects-index-hero">
              <div>
                <p className="projects-kicker">Portfolio Projects</p>
                <h1>Systems I’ve designed, engineered, and shipped.</h1>
              </div>
              <div className="projects-hero-copy">
                <p>
                  Real product work across AI agents, restaurant automation, cybersecurity intelligence, dashboards,
                  lead platforms, mobile apps, and commerce workflows.
                </p>
                <div className="projects-type-strip">
                  {projectTypes.map((type) => (
                    <span key={type}>{type}</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <FadeIn key={project.slug} delay={index * 0.025}>
                <ProjectCard project={project} index={index + 1} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
