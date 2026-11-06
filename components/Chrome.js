"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import InkLogo from "./InkLogo";
import ContactButton from "./ContactButton";

// Shared nav + top-down mobile menu for every page. Theme-agnostic: pill/menu
// colours track the CSS tokens, so wrapping a page in [data-theme="dark"]
// (e.g. About) flips the chrome automatically.
export default function Chrome({ active = null }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.classList.remove("menu-open");
      document.body.style.overflow = "";
    };
  }, [open]);

  const cur = (k) => (active === k ? "page" : undefined);

  return (
    <>
      <header className="nav">
        <div className="wrap navrow">
          <InkLogo />
          <nav className="navright" aria-label="Primary">
            <Link className="nlink" href="/#work" aria-current={cur("work")}>
              <span className="ul">Work</span>
            </Link>
            <Link className="nlink" href="/about" aria-current={cur("about")}>
              <span className="ul">About</span>
            </Link>
            <ContactButton className="nlink">
              <span className="ul">Contact</span>
            </ContactButton>
          </nav>
          <button
            className="burger"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open ? "true" : "false"}
            aria-controls="menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className={"menu" + (open ? " open" : "")} id="menu" aria-hidden={open ? "false" : "true"}>
        <nav className="menulinks wrap" aria-label="Mobile">
          <Link href="/#work" onClick={() => setOpen(false)}>
            Work
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <ContactButton after={() => setOpen(false)}>Contact</ContactButton>
        </nav>
      </div>
    </>
  );
}
