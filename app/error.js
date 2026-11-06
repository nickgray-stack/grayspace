"use client";
import { useEffect } from "react";

// Route-level error boundary (renders inside the root layout). Branded, recoverable.
export default function Error({ error, reset }) {
  useEffect(() => {
    // hook a logger here later (Sentry etc.)
  }, [error]);
  return (
    <main className="contact wrap" id="main">
      <section className="chero">
        <h1 className="clede">Something broke.</h1>
        <p className="csub">An unexpected error occurred. Try again, or head back to the work.</p>
        <div className="cactions">
          <button className="cbtn" type="button" onClick={() => reset()}>
            Try again
          </button>
          <a className="cbtn ghost" href="/">
            Back to work
          </a>
        </div>
      </section>
    </main>
  );
}
