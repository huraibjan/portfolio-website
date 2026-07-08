"use client";

import { useEffect } from "react";

/**
 * Dev-style reticle cursor: a rounded-square bracket that trails the pointer
 * with a slight lag, plus a precise center dot. Expands over interactive
 * elements. Only active on fine-pointer (mouse) devices — never on touch.
 */
export default function CustomCursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const root = document.documentElement;

    const ring = document.createElement("div");
    ring.className = "dev-cursor";
    const dot = document.createElement("div");
    dot.className = "dev-cursor-dot";
    document.body.appendChild(ring);
    document.body.appendChild(dot);
    root.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let active = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      if (!active) {
        active = true;
        root.classList.add("cursor-active");
      }
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest?.(
        "a, button, [role='button'], input, textarea, select, label, .falling-icon, [data-cursor-hover]"
      );
      root.classList.toggle("cursor-hover", interactive);
    };

    const loop = () => {
      // trailing lerp for the reticle ring
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onLeave = () => root.classList.remove("cursor-active");
    const onEnter = () => root.classList.add("cursor-active");
    const onDown = () => root.classList.add("cursor-down");
    const onUp = () => root.classList.remove("cursor-down");

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      root.classList.remove("has-custom-cursor", "cursor-active", "cursor-hover", "cursor-down");
      ring.remove();
      dot.remove();
    };
  }, []);

  return null;
}
