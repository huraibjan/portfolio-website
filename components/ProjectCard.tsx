import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project, index }: { project: Project; index?: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="project-tile group"
    >
      <div className="project-tile-media">
        <div className="project-tile-number">/{String(index ?? 1).padStart(2, "0")}</div>
        <div className="project-tile-image">
          <Image
            src={project.image}
            alt={`${project.name} project preview`}
            fill
            sizes="(max-width: 768px) 92vw, 560px"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="project-tile-body">
        <div>
          <p>{project.category}</p>
          <h3>{project.name}</h3>
          <span>{project.description}</span>
        </div>
        <div className="project-tile-tags">
          {project.tech.slice(0, 5).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="project-tile-bottom">
          <small>{project.impact.slice(0, 2).join(" / ")}</small>
          <span className="project-tile-arrow">
            <ArrowUpRight size={20} />
          </span>
        </div>
      </div>
    </Link>
  );
}
