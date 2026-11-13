"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = { nav: string[][] };

/**
 * Key the stateful menu by pathname. When navigation changes (including
 * browser back/forward), React remounts the menu with `open` reset to false.
 * This avoids synchronously setting state inside an effect.
 */
export function MobileNav({ nav }: Props) {
  const pathname = usePathname();
  return <MobileNavMenu key={pathname} nav={nav} />;
}

function MobileNavMenu({ nav }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="mobile-nav">
      <button
        type="button"
        className="mobile-nav-toggle"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <span className="mobile-nav-icon" aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>

      {open ? (
        <div id="mobile-nav-panel" className="mobile-nav-panel">
          <nav aria-label="Mobile navigation">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)}>Project enquiry ↗</Link>
            <a href="https://github.com/AsaifAli" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/sk-asaif-ali-134873243" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
