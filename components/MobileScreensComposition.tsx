"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

type MobileScreen = {
  label: string;
  src: string;
};

export function MobileScreensComposition({ screens, className = "" }: { screens: MobileScreen[]; className?: string }) {
  const visibleScreens = screens.slice(0, 6);

  return (
    <div className={`mobile-screens-composition ${className}`}>
      {visibleScreens.map((screen, index) => (
        <div className="mobile-screens-phone" key={screen.src} style={{ "--phone-index": index } as CSSProperties}>
          <div className="mobile-screens-shell">
            <div className="mobile-screens-button mobile-screens-button-left-a" />
            <div className="mobile-screens-button mobile-screens-button-left-b" />
            <div className="mobile-screens-button mobile-screens-button-right" />
            <div className="mobile-screens-glass">
              <Image src={screen.src} alt={screen.label} fill sizes="(max-width: 768px) 35vw, 180px" className="object-cover object-top" />
              <div className="mobile-screens-island" />
              <div className="mobile-screens-home" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
