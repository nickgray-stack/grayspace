"use client";
import { copyContact } from "@/lib/contact";

// The single Contact action (copy email + toast). Styled by whatever className
// the caller passes (nav pill, footer row, About mbtn). `after` lets callers
// run follow-up work (e.g. close the mobile menu).
export default function ContactButton({ className, children, after }) {
  const handle = (e) => {
    e.preventDefault();
    copyContact();
    if (after) after();
  };
  return (
    <button type="button" className={className} onClick={handle}>
      {children}
    </button>
  );
}
