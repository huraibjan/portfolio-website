"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/skills";

const featuredSkills = [
  {
    title: "AI Agents",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "RAG",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "FastAPI",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Next.js",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Flutter",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Qdrant",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Twilio",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Redis",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Cassandra",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Docker",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "PostgreSQL",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Kafka",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
  },
];

export function TechStackRing() {
  const marqueeSkills = [...featuredSkills, ...featuredSkills];

  return (
    <div className="tech-ring-shell">
      <div className="tech-ring-copy">
        <p className="hanzo-label">Technical Stack</p>
        <div>
          <h2>Tools I use to build across AI, product, data, mobile, cloud, and automation.</h2>
          <span>A strong systems stack across AI, APIs, product interfaces, databases, cloud, and data infrastructure.</span>
        </div>
      </div>

      <div className="tech-ring-stage">
        <motion.div
          className="tech-ring-track"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        >
          {marqueeSkills.map((skill, index) => (
            <motion.div
              className="tech-ring-item"
              key={`${skill.title}-${index}`}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.22 }}
            >
                <span className="tech-ring-photo" style={{ backgroundImage: `url(${skill.image})` }} />
                <strong>{skill.title}</strong>
              <small>{String((index % featuredSkills.length) + 1).padStart(2, "0")}</small>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="tech-stack-board">
        {skillGroups.map((group, index) => (
          <motion.div
            className="tech-stack-panel"
            key={group.title}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: index * 0.035 }}
          >
            <div>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{group.title}</h3>
            </div>
            <p>{group.items.slice(0, 4).join(" / ")}</p>
            <div>
              {group.items.map((item) => (
                <small key={item}>{item}</small>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
