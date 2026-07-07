import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/AnimatedShell";
import { Footer } from "@/components/Footer";
import { MobileScreensComposition } from "@/components/MobileScreensComposition";
import { Nav } from "@/components/Nav";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found | Huraib Jan",
    };
  }

  return {
    title: `${project.name} | Huraib Jan`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const websiteShot = project.gallery?.find((item) => item.kind === "website");
  const mobileShots = project.gallery?.filter((item) => item.kind === "mobile") ?? [];
  const mobileGroup = project.gallery?.find((item) => item.kind === "mobile-group");
  const mobileScreens = mobileGroup?.screens ?? mobileShots.map((shot) => ({ label: shot.label, src: shot.src }));
  const desktopShots = project.gallery?.filter((item) => item.kind === "desktop") ?? [];
  const appStoreLink = project.links?.find((link) => /ios|app/i.test(link.label));

  return (
    <main className="studio-page relative z-10 min-h-screen">
      <Nav />
      <article className="px-4 pb-20 pt-28 sm:px-7">
        <div className="mx-auto max-w-[1480px]">
          <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-black/60 transition hover:text-black">
            <ArrowLeft size={16} />
            Back to work
          </Link>

          <section className="mt-10 border-y border-black/20 py-8">
            <FadeIn>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-black/50">{project.category}</p>
              <h1 className="mt-6 max-w-6xl text-6xl font-black uppercase leading-none text-black sm:text-7xl lg:text-9xl">
                {project.name}
              </h1>
              <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_0.55fr]">
                <p className="max-w-4xl text-2xl font-semibold leading-9 text-black/75">{project.description}</p>
                <div className="flex flex-wrap content-start gap-3">
                  {project.links?.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-black/20 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-black transition hover:bg-black hover:text-white"
                    >
                      {link.label} <ArrowUpRight size={15} />
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </section>

          <FadeIn className="mt-10">
            <div className="relative aspect-[16/9] overflow-hidden bg-black">
              <Image src={project.image} alt={`${project.name} interface preview`} fill className="object-cover" priority />
            </div>
          </FadeIn>

          {project.gallery ? (
            <section className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              {websiteShot ? (
                <FadeIn>
                  <div className="h-full rounded-[32px] border border-black/15 bg-white/55 p-3 shadow-[0_28px_80px_rgba(0,0,0,0.10)]">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-black">
                      <Image
                        src={websiteShot.src}
                        alt={websiteShot.label}
                        fill
                        sizes="(max-width: 1024px) 92vw, 760px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-4 px-2 py-4">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-black/50">Website Experience</p>
                      <span className="text-xs font-bold uppercase tracking-[0.12em] text-black/45">{project.name}</span>
                    </div>
                  </div>
                </FadeIn>
              ) : null}

              {mobileScreens.length ? (
                <FadeIn delay={0.08}>
                  <div className="h-full rounded-[32px] border border-black/15 bg-white/55 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.10)]">
                    <div className="mb-5 flex items-end justify-between gap-5">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-black/50">Mobile App</p>
                        <h2 className="mt-2 text-3xl font-black uppercase leading-none tracking-[-0.04em] text-black sm:text-4xl">
                          Ordering flow screens
                        </h2>
                      </div>
                      {appStoreLink ? (
                        <a
                          href={appStoreLink.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-black px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-black/80"
                        >
                          App Store <ArrowUpRight size={15} />
                        </a>
                      ) : null}
                    </div>
                    <MobileScreensComposition screens={mobileScreens} />
                  </div>
                </FadeIn>
              ) : null}

              {desktopShots.length ? (
                <FadeIn delay={0.08}>
                  <div className="h-full rounded-[32px] border border-black/15 bg-white/55 p-4 shadow-[0_28px_80px_rgba(0,0,0,0.10)] lg:col-span-2">
                    <div className="mb-5 flex items-end justify-between gap-5">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-black/50">Product Screens</p>
                        <h2 className="mt-2 text-3xl font-black uppercase leading-none tracking-[-0.04em] text-black sm:text-4xl">
                          Dashboard, workflow, and product interface views
                        </h2>
                      </div>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-2">
                      {desktopShots.map((shot) => (
                        <div key={shot.src} className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-black">
                          <Image
                            src={shot.src}
                            alt={shot.label}
                            fill
                            sizes="(max-width: 1024px) 92vw, 620px"
                            className="object-cover object-top"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ) : null}
            </section>
          ) : null}

          <section className="mt-12 grid gap-px overflow-hidden border border-black/20 bg-black/20 lg:grid-cols-3">
            <FadeIn>
              <div className="h-full bg-[#f4f1ea] p-7">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-black/50">Role</p>
                <p className="mt-5 text-lg leading-8 text-black/70">{project.role}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <div className="h-full bg-[#f4f1ea] p-7">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-black/50">System Focus</p>
                <div className="mt-5 space-y-4">
                  {project.impact.map((item) => (
                    <p key={item} className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.08em] text-black/70">
                      <CheckCircle2 className="shrink-0 text-black" size={18} />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.16}>
              <div className="h-full bg-[#f4f1ea] p-7">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-black/50">Tech Stack</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span key={item} className="rounded-full border border-black/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-black/60">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </section>

          <FadeIn className="mt-12">
            <section className="border-y border-black/20 py-10">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-black/50">Project Narrative</p>
              <h2 className="mt-5 max-w-5xl text-5xl font-black uppercase leading-none text-black sm:text-7xl">
                From product idea to working system.
              </h2>
              <p className="mt-8 max-w-4xl text-lg leading-8 text-black/70">
                This project demonstrates the way I approach AI and software products: define the workflow, map the user journey,
                design service boundaries, build the backend and interface, connect automation where it creates leverage, and package
                the result so technical and business stakeholders can understand the value.
              </p>
            </section>
          </FadeIn>
        </div>
      </article>
      <Footer />
    </main>
  );
}
