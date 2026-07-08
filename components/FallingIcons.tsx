"use client";

import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";

export type FallingIcon = { name: string; src: string };

type FallingIconsProps = {
  icons: FallingIcon[];
  /** How the falling effect activates. Default: "scroll" (works on mobile too). */
  trigger?: "click" | "hover" | "auto" | "scroll" | "manual";
  /** When trigger is "manual", set true to start the fall. */
  active?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  /** Icon box size in px. */
  iconSize?: number;
  wireframes?: boolean;
  backgroundColor?: string;
  className?: string;
};

export default function FallingIcons({
  icons,
  trigger = "scroll",
  active = false,
  gravity = 0.56,
  mouseConstraintStiffness = 0.9,
  iconSize = 56,
  wireframes = false,
  backgroundColor = "transparent",
  className = "",
}: FallingIconsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsLayerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [effectStarted, setEffectStarted] = useState(false);

  // Manual trigger: start when `active` flips true
  useEffect(() => {
    if (trigger === "manual" && active) setEffectStarted(true);
  }, [trigger, active]);

  // Trigger handling: auto / scroll(IntersectionObserver)
  useEffect(() => {
    if (trigger === "auto") {
      setEffectStarted(true);
      return;
    }
    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.35 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint, Body } = Matter;

    const container = containerRef.current;
    const iconsLayer = iconsLayerRef.current;
    const canvasContainer = canvasContainerRef.current;
    if (!container || !iconsLayer || !canvasContainer) return;

    const containerRect = container.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;
    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainer,
      engine,
      options: { width, height, background: backgroundColor, wireframes },
    });

    const boundaryOptions = { isStatic: true, render: { fillStyle: "transparent" } };
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    const iconEls = [...iconsLayer.querySelectorAll<HTMLElement>(".falling-icon")];
    const iconBodies = iconEls.map((elem) => {
      const rect = elem.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        chamfer: { radius: 12 },
        restitution: 0.8,
        frictionAir: 0.015,
        friction: 0.2,
        render: { fillStyle: "transparent" },
      });

      Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: 0 });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
      return { elem, body };
    });

    // Pin each icon to its body's starting spot before physics moves it
    iconBodies.forEach(({ elem, body }) => {
      elem.style.position = "absolute";
      elem.style.left = `${body.position.x}px`;
      elem.style.top = `${body.position.y}px`;
      elem.style.transform = "translate(-50%, -50%)";
      elem.style.margin = "0";
    });

    const mouse = Mouse.create(container);
    // Release wheel capture so the page keeps scrolling normally over this section
    const m = mouse as unknown as {
      element: HTMLElement;
      mousewheel: (e: Event) => void;
    };
    m.element.removeEventListener("wheel", m.mousewheel);
    m.element.removeEventListener("DOMMouseScroll", m.mousewheel);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: mouseConstraintStiffness, render: { visible: false } },
    });
    render.mouse = mouse;

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...iconBodies.map((ib) => ib.body),
    ]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    let rafId = 0;
    const syncLoop = () => {
      iconBodies.forEach(({ body, elem }) => {
        elem.style.left = `${body.position.x}px`;
        elem.style.top = `${body.position.y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      rafId = requestAnimationFrame(syncLoop);
    };
    rafId = requestAnimationFrame(syncLoop);

    return () => {
      cancelAnimationFrame(rafId);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && render.canvas.parentNode === canvasContainer) {
        canvasContainer.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`falling-icons-container ${className}`}
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
    >
      <div ref={iconsLayerRef} className="falling-icons-layer">
        {icons.map((ic, i) => (
          <div key={`${ic.name}-${i}`} className="falling-icon" title={ic.name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ic.src}
              alt={ic.name}
              width={iconSize}
              height={iconSize}
              loading="lazy"
              draggable={false}
              style={{ width: iconSize, height: iconSize }}
            />
          </div>
        ))}
      </div>
      <div ref={canvasContainerRef} className="falling-icons-canvas" />
    </div>
  );
}
